import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from '../models/Partners';
import { RestService } from './rest.service';

@Injectable({
	providedIn: 'root',
})
export class PartnersService {
	url: string = 'partners';
	constructor(private servise: RestService<Partner>) { }

	get(): Observable<Partner[]> {
		return this.servise.getAll(this.url);
	}

	create(partner: Partner): Observable<Partner> {
		return this.servise.post(this.url, partner);
	}

	update(partner: Partner): Observable<Partner> {
		return this.servise.put(this.url, partner);
	}

	delete(id: string): Observable<any> {
		return this.servise.delete(`${this.url}/${id}`);
	}
}
