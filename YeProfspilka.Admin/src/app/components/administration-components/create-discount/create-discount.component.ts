import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, mergeMap, Subject, switchMap, takeUntil } from 'rxjs';
import { Discount } from 'src/app/models/Discount';
import { DiscountTypeOptions } from 'src/app/models/DiscountType';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import AppState from 'src/app/store';
import { createDiscount } from 'src/app/store/actions/discounts.actions';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-create-discount',
	templateUrl: './create-discount.component.html',
})
export class CreateDiscountComponent implements OnInit, OnDestroy {
	createDiscountForm: FormGroup;
	options = DiscountTypeOptions;

	destroy$: Subject<void> = new Subject();

	file: File = null;

	constructor(
		private formBuilder: FormBuilder,
		private imageUploader: FileUploaderService,
		private store: Store<AppState>,
		private toastr: ToastrService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.createDiscountForm = this.formBuilder.group(
			{
				name: ['', [Validators.required]],
				description: ['', [Validators.required]],
				discountType: [this.options[0].value, [Validators.required]],
				withQrCode: [true],
				withBarCode: [false],
				barCodeImage: [''],
			},
			{ validator: this.barCodeImageValidator }
		);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	create() {
		console.log(this.createDiscountForm);
		if (this.createDiscountForm.valid) {
			const values = this.createDiscountForm.value;
			console.log(values);
			if (values.barCodeImage == null || values.barCodeImage === '') {
				this.store.dispatch(
					createDiscount({ discount: { ...values, discountType: +values.discountType } })
				);
			} else {
				this.imageUploader
					.uploadImage(this.file)
					.pipe(
						takeUntil(this.destroy$),
						map((url) => {
							this.file = null;
							this.store.dispatch(
								createDiscount({
									discount: {
										...values,
										discountType: +values.discountType,
										barCodeImage: url,
									},
								})
							);
						}),
						switchMap(() => {
							this.router.navigate(['/administration/discounts']);
							return EMPTY;
						}),
						catchError(() => {
							this.toastr.error('Щось пішло не так при завантаженні фото!');
							return EMPTY;
						})
					)
					.subscribe();
			}
		}
	}

	handleSelectChange(value: any) {
		this.discountType.setValue(value, {
			onlySelf: true,
		});
	}

	handleFileChange(file: File) {
		this.file = file;
	}

	private barCodeImageValidator(control: AbstractControl): { [key: string]: any } | null {
		const withBarCode = control.get('withBarCode')?.value;
		const barCodeImage = control.get('barCodeImage')?.value;

		if (withBarCode && !barCodeImage) {
			return { required: true };
		}

		return null;
	}

	get discountType() {
		return this.createDiscountForm.get('discountType');
	}
}
