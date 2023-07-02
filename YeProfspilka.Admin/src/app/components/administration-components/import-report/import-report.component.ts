import { ImportResult, } from 'src/app/models/ImportResult';
import { ImportType, } from 'src/app/models/ImportType';

import { Component, Input, OnInit, } from '@angular/core';

@Component({
	selector: 'app-import-report',
	templateUrl: './import-report.component.html',
	styleUrls: ['./import-report.component.css'],
})
export class ImportReportComponent implements OnInit {
	@Input() importResult: ImportResult = {
		totalItems: 1245,
		newUsers: 10,
		lastImportDate: '20.12.2012',
		replacedUsers: 12,
		lastImportFileName: 'Test file.xlsx',
		lastImportIsChangeCourseSelected: false,
		lastImportType: ImportType.Merge,
	};

	constructor() {}

	ngOnInit(): void {}
}
