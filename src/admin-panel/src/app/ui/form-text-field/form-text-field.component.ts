import { Component, Input, OnInit, } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-text-field',
    templateUrl: './form-text-field.component.html',
    imports: [FormsModule, ReactiveFormsModule]
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
