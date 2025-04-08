import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { Event } from '../models/Event';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    readonly url: string = 'event';

    constructor(private service: RestService<Event>) {}

    get = (): Observable<Event[]> => this.service.getAll(this.url);

    getById = (id: string): Observable<Event> => this.service.getOne(`${this.url}/${id}`);

    delete = (id: string): Observable<any> => this.service.delete(`${this.url}/${id}`);

    create(event: Event, images: File[]): Observable<any> {
        const formData = new FormData();

        formData.append('Title', event.title);
        formData.append('Date', event.date);
        formData.append('ShortDescription', event.shortDescription);
        formData.append('Description', event.description);

        images.forEach((image) => {
            formData.append('Images', image);
        });

        return this.service.postForm(this.url, formData);
    }

    update(event: Event): Observable<Event> {
        return this.service.put(this.url, event);
    }
}
