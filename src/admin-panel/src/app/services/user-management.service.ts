import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, map, Observable, switchMap } from 'rxjs';

import { ImportType } from '../models/ImportType';
import { UploadFileResults } from '../models/UploadFileResults';
import { DownloadService } from './download.service';
import { RestService } from './rest.service';
import { TokenService } from './token.service';
import { PaginationRequest, PaginationResponse } from '../models/pagination';
import { UserManagementModel } from '../models/UserManagementModel';
import { OperationResponse } from '../models/OperationResponse';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
    url = 'userManagement';

    constructor(
        private service: RestService<UploadFileResults>,
        private http: HttpClient,
        private downloadService: DownloadService,
        private toastrService: ToastrService,
        private token: TokenService
    ) {}

    uploadUsers(file: File, importType: ImportType = ImportType.Replace) {
        const formData = new FormData();
        formData.append('file', file);
        return this.service.postForm(`${this.url}/upload?importType=${importType}`, formData);
    }

    getUsers(request: PaginationRequest): Observable<PaginationResponse<UserManagementModel>> {
        let params = new HttpParams().set('pageNumber', request.pageNumber).set('pageSize', request.pageSize);

        if (request.searchTerm) {
            params = params.set('searchTerm', request.searchTerm);
        }

        return this.http.get<PaginationResponse<UserManagementModel>>(`${this.service.baseURL}/${this.url}/users`, {
            params,
            withCredentials: true,
        });
    }

    getUserManagementEntity(userId: string): Observable<UserManagementModel> {
        return this.http.get<UserManagementModel>(`${this.service.baseURL}/${this.url}/users/${userId}`, {
            withCredentials: true,
        });
    }

    exportUsers(): Observable<void> {
        return this.http
            .get<HttpResponse<Blob>>(`${this.service.baseURL}/${this.url}/export`, {
                observe: 'response',
                responseType: 'blob' as 'json',
                headers: {
                    Authorization: `Bearer ${this.token.getAccessToken()}`,
                },
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

    deactivateUser(userId: string): Observable<OperationResponse> {
        return this.http.post<OperationResponse>(
            `${this.service.baseURL}/${this.url}/users/${userId}/deactivate`,
            null,
            {
                withCredentials: true,
            }
        );
    }

    activateUser(userId: string): Observable<OperationResponse> {
        return this.http.post<OperationResponse>(
            `${this.service.baseURL}/${this.url}/users/${userId}/activate`,
            null,
            {
                withCredentials: true,
            }
        );
    }

    updateUser(user: UserManagementModel): Observable<OperationResponse> {
        return this.http.patch<OperationResponse>(`${this.service.baseURL}/${this.url}/users`, user, {
            withCredentials: true,
        });
    }
}
