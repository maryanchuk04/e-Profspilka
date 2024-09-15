import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Advantage } from '../models/Advantage';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root',
})
export class AdvantageService {
    private url = 'advantage';

    constructor(private service: RestService<Advantage>) {}

    get(): Observable<Advantage[]> {
        return this.service.getAll(this.url);
    }

    create(advantage: Advantage): Observable<Advantage> {
        return this.service.post(this.url, advantage);
    }

    getById(id: string): Observable<Advantage> {
        return this.service.getOne(this.url);
    }

    update(advantage: Advantage): Observable<Advantage> {
        return this.service.put(this.url, advantage);
    }

    delete(id: string): Observable<any> {
        return this.service.delete(`${this.url}/${id}`);
    }
}
