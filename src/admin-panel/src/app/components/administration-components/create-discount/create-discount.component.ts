import { ToastrService, } from 'ngx-toastr';
import { catchError, EMPTY, first, map, mergeMap, Subject, switchMap, takeUntil, } from 'rxjs';
import { Discount, } from 'src/app/models/Discount';
import { DiscountTypeOptions, } from 'src/app/models/DiscountType';
import { DiscountService, } from 'src/app/services/discount.service';
import { FileUploaderService, } from 'src/app/services/file-uploader.service';
import AppState from 'src/app/store';
import { createDiscount, updateDiscount, } from 'src/app/store/actions/discounts.actions';

import { Component, OnDestroy, OnInit, } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, } from '@angular/router';
import { Store, } from '@ngrx/store';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { FormTextFieldComponent } from '../../../ui/form-text-field/form-text-field.component';
import { EditorComponent } from '../../../ui/editor/editor.component';
import { SelectComponent } from '../../../ui/select/select.component';
import { QuestionTooltipComponent } from '../../../ui/question-tooltip/question-tooltip.component';
import { FileInputFieldComponent } from '../../../ui/file-input-field/file-input-field.component';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
    selector: 'app-create-discount',
    templateUrl: './create-discount.component.html',
    imports: [NgIf, LoaderComponent, FormsModule, ReactiveFormsModule, FormTextFieldComponent, EditorComponent, SelectComponent, QuestionTooltipComponent, FileInputFieldComponent, ButtonComponent]
})
export class CreateDiscountComponent implements OnInit, OnDestroy {
	createDiscountForm: FormGroup;
	options = DiscountTypeOptions;

	destroy$: Subject<void> = new Subject();
	discount: Discount = null;
	loading = true;
	file: File = null;

	constructor(
		private formBuilder: FormBuilder,
		private imageUploader: FileUploaderService,
		private store: Store<AppState>,
		private toastr: ToastrService,
		private router: Router,
		private actRoute: ActivatedRoute,
		private discountService: DiscountService
	) {}

	ngOnInit(): void {
		this.actRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
			if (id) {
				this.discountService
					.getById(id)
					.pipe(first())
					.subscribe((res) => {
						this.discount = res;
						this.createDiscountForm = this.formBuilder.group(
							{
								name: [this.discount.name, [Validators.required]],
								description: [this.discount.description, [Validators.required]],
								discountType: [this.discount.discountType, [Validators.required]],
								withQrCode: [this.discount.withQrCode],
								withBarCode: [this.discount.withBarCode],
								barCodeImage: [this.discount.barCodeImage ?? ''],
							},
							{ validator: this.barCodeImageValidator }
						);
						this.loading = false;
					});
				return;
			} else {
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
				this.loading = false;
			}
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	create() {
		if (this.createDiscountForm.valid) {
			const values = this.createDiscountForm.value;
			if (values.barCodeImage == null || values.barCodeImage === '') {
				if (this.discount) {
					console.log(this.discount);
					this.store.dispatch(
						updateDiscount({
							discount: {
								...values,
								discountType: +values.discountType,
								id: this.discount.id,
							},
						})
					);
				} else {
					this.store.dispatch(
						createDiscount({
							discount: { ...values, discountType: +values.discountType },
						})
					);
				}
			} else {
				this.createOrUpdate(values);
			}
		}
	}

	handleSelectChange(value: any) {
		this.discountType.setValue(value, {
			onlySelf: true,
		});
	}

	private createOrUpdate(values: any) {
		if (this.discount) {
			this.imageUploader
				.uploadImage(this.file)
				.pipe(
					takeUntil(this.destroy$),
					map((url) => {
						this.file = null;
						this.store.dispatch(
							updateDiscount({
								discount: {
									...values,
									discountType: +values.discountType,
									barCodeImage: url,
								},
							})
						);
					}),
					map(() => {
						this.router.navigate(['/administration/discounts']);
						return EMPTY;
					}),
					catchError(() => {
						this.toastr.error('Щось пішло не так при завантаженні фото!');
						return EMPTY;
					})
				)
				.subscribe();
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
					map(() => {
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
