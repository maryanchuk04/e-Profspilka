import { Validators } from 'ngx-editor';
import { DiscountTypeOptions } from 'src/app/models/DiscountType';

import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-create-discount',
	templateUrl: './create-discount.component.html',
})
export class CreateDiscountComponent implements OnInit {
	createDiscountForm: FormGroup;
	options = DiscountTypeOptions;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.createDiscountForm = this.formBuilder.group(
			{
				name: ['', [Validators.required]],
				description: ['', [Validators.required]],
				discountType: [this.options[0].value, [Validators.required]],
				withQrCode: [true],
				withBarCode: [false],
				barCodeImage: [null],
			},
			{ validator: this.barCodeImageValidator }
		);
		this.createDiscountForm.get('name').updateValueAndValidity();
		this.createDiscountForm.get('description').updateValueAndValidity();
	}

	create() {
		if (this.createDiscountForm.valid) {
		}
		console.log(this.createDiscountForm);
	}

	handleSelectChange(value: any) {
		this.discountType.setValue(value, {
			onlySelf: true,
		});
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
