import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class RestService<T> {
	baseURL: string = environment.apiUrl;

	private headers: HttpHeaders = new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	});

	constructor(private http: HttpClient) { }

	getOne(url: string): Observable<T> {
		return this.http.get<T>(`${this.baseURL}/${url}`, {
			headers: this.headers,
		});
	}

	getAll(url: string): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseURL}/${url}`, {
			headers: this.headers,
		});
	}

	post(url: string, data: any): Observable<T> {
		return this.http.post<T>(`${this.baseURL}/${url}`, data, {
			headers: this.headers,
		});
	}

	delete(url: string) {
		return this.http.delete(`${this.baseURL}/${url}`, {
			headers: this.headers,
		});
	}

	put(url: string, body: T): Observable<T> {
		return this.http.put<T>(`${this.baseURL}/${url}`, body, {
			headers: this.headers,
		});
	}

	getWithToken(url: string, bearer: string) {
		return this.http.get<any>(`${this.baseURL}/${url}`, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			})
		});
	}

	postForm(url: string, formData: FormData): Observable<T> {
		return this.http.post<T>(`${this.baseURL}/${url}`, formData, {
			headers: new HttpHeaders({
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			})
		});
	}
}
