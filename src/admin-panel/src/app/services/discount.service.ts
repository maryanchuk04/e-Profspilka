import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Discount } from '../models/Discount';
import { RestService } from './rest.service';

@Injectable({
	providedIn: 'root'
})
export class DiscountService {
	private url = "discount";

	constructor(private service: RestService<Discount>) { }

	get(): Observable<Discount[]> {
		return this.service.getAll(this.url);
	}

	create(discount: Discount): Observable<Discount> {
		return this.service.post(this.url, discount);
	}

	getById(id: string): Observable<Discount> {
		return this.service.getOne(`${this.url}/${id}`);
	}

	update(discount: Discount): Observable<Discount> {
		return this.service.put(this.url, discount);
	}

	delete(id: string): Observable<any> {
		return this.service.delete(`${this.url}/${id}`);
	}
}
