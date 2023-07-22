import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { UploadFileResults } from '../models/UploadFileResults';
import { DownloadService } from './download.service';
import { RestService } from './rest.service';

@Injectable({ providedIn: 'root' })
export class StudentStoreService {
    url = 'student-store';

    constructor(
        private service: RestService<UploadFileResults>,
        private http: HttpClient,
        private downloadService: DownloadService,
        private toastrService: ToastrService
    ) {}

    uploadUsers(body: { file: File; isOverrideMethod: boolean }) {
        const formData = new FormData();
        formData.append('file', body.file);
        return this.service.postForm(this.url, formData);
    }

    getAll(): Observable<any> {
        return this.service.getAll(this.url);
    }

    exportUsers(): void {
        this.http
            .get<HttpResponse<Blob>>(`${this.service.baseURL}/${this.url}/export`, { observe: 'response', responseType: 'blob' as 'json' })
            .subscribe({
                next: (response) => {
                    this.downloadService.getDownload(response as unknown as HttpResponse<Blob>);
                    this.toastrService.success('Всіх користувачів було експортовано!');
                },
                error: () => {
                    this.toastrService.error('Помилка при експорті користувачів!');
                },
            });
    }
}
