import { ToastrService, } from 'ngx-toastr';
import { catchError, EMPTY, map, Observable, switchMap, } from 'rxjs';

import { HttpClient, HttpResponse, } from '@angular/common/http';
import { Inject, Injectable, } from '@angular/core';

import { ImportType, } from '../models/ImportType';
import { UploadFileResults, } from '../models/UploadFileResults';
import { DownloadService, } from './download.service';
import { RestService, } from './rest.service';

@Injectable({ providedIn: 'root' })
export class StudentStoreService {
	url = 'student-store';

	constructor(
		private service: RestService<UploadFileResults>,
		private http: HttpClient,
		private downloadService: DownloadService,
		private toastrService: ToastrService
	) {}

	uploadUsers(file: File, importType: ImportType = ImportType.Replace) {
		const formData = new FormData();
		formData.append('file', file);
		return this.service.postForm(`${this.url}/upload?importType=${importType}`, formData);
	}

	getAll(): Observable<any> {
		return this.service.getAll(this.url);
	}

	exportUsers(): Observable<void> {
		return this.http
			.get<HttpResponse<Blob>>(`${this.service.baseURL}/${this.url}/export`, {
				observe: 'response',
				responseType: 'blob' as 'json',
			})
			.pipe(
				map((response) => {
					this.downloadService.getDownload(response as unknown as HttpResponse<Blob>);
					this.toastrService.success('Всіх користувачів було експортовано!');
				}),
				catchError(() => {
					this.toastrService.error('Помилка при експорті користувачів!');
					return EMPTY;
				})
			);
	}
}
