import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-file-input-field',
	templateUrl: './file-input-field.component.html',
})
export class FileInputFieldComponent implements OnInit {
	@Input() placeholder: string;
	@Input() controlName: string;

	formGroup: FormGroup;
	selectedFile: File;

	constructor(private rootFormGroup: FormGroupDirective) {}

	ngOnInit(): void {
		this.formGroup = this.rootFormGroup.control;
		setTimeout(() => {
			this.formGroup.get(this.controlName).updateValueAndValidity();
		});
	}

	onFileSelected(event: any) {
		const file = event.target.files[0];
		this.selectedFile = file;
	}
}
