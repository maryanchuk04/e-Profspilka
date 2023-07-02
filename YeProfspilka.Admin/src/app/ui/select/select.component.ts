import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormGroup, FormGroupDirective, } from '@angular/forms';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
	@Input() placeholder: string;
	@Input() options: any[] = [];

	@Input() controlName: string = '';

	formGroup: FormGroup;

	constructor(private rootFormGroup: FormGroupDirective) {}

	ngOnInit(): void {
		this.formGroup = this.rootFormGroup?.control;
	}
}
