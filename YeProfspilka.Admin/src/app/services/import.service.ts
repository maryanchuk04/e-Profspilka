import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { ImportResult } from '../models/ImportResult';
import { RestService } from './rest.service';

@Injectable({ providedIn: 'root' })
export class ImportService {
	private url = '/import-result';
	constructor(private service: RestService<ImportResult>) {}

	getLastImportResult(): Observable<ImportResult> {
		return this.service.getOne(this.url);
	}
}
