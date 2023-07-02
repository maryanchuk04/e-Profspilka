import { Validators } from 'ngx-editor';
import { ImportType } from 'src/app/models/ImportType';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

const importOptions = [
	{
		label: 'Додати',
		value: ImportType.Add,
		description: 'Додає до існуючих користувачів нових (якщо вже такий існує, то ігнорує)',
	},
	{
		label: 'Замінити',
		value: ImportType.Replace,
		description: 'Замінює всіх існуючих користувачів на користувачів з файлу',
	},
	{
		label: 'З`єднати',
		value: ImportType.Merge,
		description:
			'Додає до всіх існуючих нових, якщо є такий вже то оновлює його данні (тільки ті що пусті)',
	},
];

@Component({
	selector: 'app-users-manager-panel',
	templateUrl: './users-manager-panel.component.html',
})
export class UsersManagerPanelComponent implements OnInit {
	form: FormGroup;
	importOptions = importOptions;

	constructor(private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({
			importType: ['', Validators.required],
			importFile: [null],
			changeCourse: [false],
		});
	}

	ngOnInit(): void {}

	uploadFile() {
		console.log(this.form);
	}

	get selectedImportTypeDescription() {
		const importType = this.form.get('importType')?.value;

		if (importType) {
			return importOptions.filter((f) => f.value === importType)[0]?.description;
		}

		return null;
	}
}
