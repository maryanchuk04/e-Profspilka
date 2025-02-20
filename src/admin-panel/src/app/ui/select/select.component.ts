import { Option } from 'src/app/models/ui-models/Option';

import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    imports: [FormsModule, ReactiveFormsModule, NgFor]
})
export class SelectComponent implements OnInit {
	@Input() options: Option[] = [];

	@Input() controlName: string;

	@Output() onChange = new EventEmitter();

	form: FormGroup;

	constructor(private rootFormGroup: FormGroupDirective) {}

	ngOnInit(): void {
		this.form = this.rootFormGroup?.control;
	}

	handleChange(event: any) {
		this.onChange.emit(event.target.value);
	}
}
