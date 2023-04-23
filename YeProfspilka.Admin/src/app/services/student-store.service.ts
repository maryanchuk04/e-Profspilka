import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { UploadFileResults } from '../models/UploadFileResults';
import { RestService } from './rest.service';

@Injectable({ providedIn: 'root' })
export class StudentStoreService {
	url = "student-store"
	constructor(private service: RestService<UploadFileResults>) { }

	uploadUsers(body: { file: File, isOverrideMethod: boolean }) {
		const formData = new FormData();
		formData.append('file', body.file);
		return this.service.postForm(this.url, formData);
	}

	getAll(): Observable<any> {
		return this.service.getAll(this.url);
	}
}