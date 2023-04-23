import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class FileUploaderService {
	constructor(private http: HttpClient) {
	}

	public uploadImage(file: File): Observable<string> {
		const formData = new FormData();
		formData.append('image', file);

		return this.http.post(`https://api.imgbb.com/1/upload?key=${environment.imgbbKey}`, formData)
			.pipe(
				map((res: any) => {
					if (res.status === HttpStatusCode.Ok) {
						return res.data.image.url;
					}
				}),
				catchError(() => throwError(new Error("Upload failed")))
			);
	}

}