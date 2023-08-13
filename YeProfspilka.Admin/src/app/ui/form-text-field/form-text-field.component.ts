import { Component, Input, OnInit, } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, } from '@angular/forms';

@Component({
	selector: 'app-form-text-field',
	templateUrl: './form-text-field.component.html',
})
export class FormTextFieldComponent implements OnInit {
	@Input() controlName: string;
	@Input() placeholder = '';

	form: FormGroup;

	constructor(private rootFormGroup: FormGroupDirective) {}

	ngOnInit(): void {
		this.form = this.rootFormGroup?.control;
	}
}
