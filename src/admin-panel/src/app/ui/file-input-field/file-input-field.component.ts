import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-file-input-field',
    templateUrl: './file-input-field.component.html',
    imports: [FormsModule, ReactiveFormsModule, NgIf]
})
export class FileInputFieldComponent {
	@Input() formGroup: FormGroup;
	@Input() controlName: string;
	@Input() placeholder: string;
	@Output() getFile: EventEmitter<File> = new EventEmitter();
	selectedFile: File | null = null;

	onFileSelected(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		if (inputElement?.files?.length) {
			this.selectedFile = inputElement.files[0];
			this.getFile.emit(this.selectedFile);
		} else {
			this.selectedFile = null;
		}
	}
}
