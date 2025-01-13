import { ToastrService, } from 'ngx-toastr';
import { pipe, Subject, takeUntil, } from 'rxjs';
import { ImportType, } from 'src/app/models/ImportType';
import { StudentStoreService, } from 'src/app/services/student-store.service';

import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackComponent } from '../../../ui/feedback/feedback.component';
import { SelectComponent } from '../../../ui/select/select.component';
import { FileInputFieldComponent } from '../../../ui/file-input-field/file-input-field.component';
import { ButtonComponent } from '../../../ui/button/button.component';

const importOptions = [
	{
		label: 'Додати',
		value: ImportType.Add,
		disabled: true,
		description: 'Додає до існуючих користувачів нових (якщо вже такий існує, то ігнорує)',
	},
	{
		label: 'Замінити',
		value: ImportType.Replace,
		disabled: false,
		description: 'Замінює всіх існуючих користувачів на користувачів з файлу',
	},
];

@Component({
    selector: 'app-users-manager-panel',
    templateUrl: './users-manager-panel.component.html',
    imports: [FeedbackComponent, FormsModule, ReactiveFormsModule, SelectComponent, FileInputFieldComponent, ButtonComponent]
})
export class UsersManagerPanelComponent implements OnInit, OnDestroy {
	form: FormGroup;
	importOptions = importOptions;
	file: File;
	destroy$: Subject<void> = new Subject();

	constructor(
		private formBuilder: FormBuilder,
		private toastrService: ToastrService,
		private studentStoreService: StudentStoreService
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			file: new FormControl(null, Validators.required),
			importType: new FormControl(ImportType.Replace, Validators.required),
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}

	uploadFile() {
		if (this.form.valid) {
			console.log(this.form.value);
			this.studentStoreService
				.uploadUsers(this.file, this.form.value.importType)
				.pipe(takeUntil(this.destroy$))
				.subscribe({
					next: (result) => {
						this.toastrService.success('Імпорт пройшов успішно');
					},
					error: () => {
						this.toastrService.error('Щось пішло не по плану :(');
					},
				});
		}
	}

	handleChange(file: File) {
		console.log(file);
		this.file = file;
	}

	get selectedImportTypeDescription() {
		const importType = this.form.get('importType')?.value;

		if (importType) {
			return importOptions.filter((f) => f.value === importType)[0]?.description;
		}

		return null;
	}
}
