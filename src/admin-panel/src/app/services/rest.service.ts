import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TokenService } from './token.service';

@Injectable({
	providedIn: 'root',
})
export class RestService<T> {
	baseURL: string = environment.apiUrl;

	constructor(private http: HttpClient, private token: TokenService) {}

	getOne(url: string): Observable<T> {
		return this.http.get<T>(`${this.baseURL}/${url}`, {
			withCredentials: true,
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token.getAccessToken()}`,
			}),
		});
	}

	getAll(url: string): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseURL}/${url}`, {
			withCredentials: true,
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token.getAccessToken()}`,
			}),
		});
	}

	post(url: string, data?: any): Observable<T> {
		return this.http.post<T>(`${this.baseURL}/${url}`, data, {
			withCredentials: true,
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token.getAccessToken()}`,
			}),
		});
	}

	delete(url: string) {
		return this.http.delete(`${this.baseURL}/${url}`, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token.getAccessToken()}`,
			}),
		});
	}

	put(url: string, body: T): Observable<T> {
		return this.http.put<T>(`${this.baseURL}/${url}`, body, {
			withCredentials: true,
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token.getAccessToken()}`,
			}),
		});
	}

	getWithToken(url: string, bearer: string) {
		return this.http.get<any>(`${this.baseURL}/${url}`, {
			withCredentials: true,
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			}),
		});
	}

	postForm(url: string, formData: FormData): Observable<T> {
		return this.http.post<T>(`${this.baseURL}/${url}`, formData, {
			withCredentials: true,
			headers: new HttpHeaders({
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			}),
		});
	}
}
