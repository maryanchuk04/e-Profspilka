import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';
import { createEvent } from 'src/app/store/actions/events.action';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
})
export class CreateEventComponent implements OnInit {
    createEventForm: FormGroup;

    constructor(private fb: FormBuilder, private toastr: ToastrService, private eventService: EventsService) {}

    ngOnInit(): void {
        this.createEventForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            date: ['', Validators.required],
            images: this.fb.array([]),
            shortDescription: ['', Validators.required],
        });
    }

    createEvent() {
        // this.store.dispatch(
        //     createEvent({
        //         event: {
        //             ...this.createEventForm.value,
        //         } as Event,
        //     })
        // );
        this.eventService
            .create({
                ...this.createEventForm.value,
            } as Event)
            .pipe(
                first(),
                tap(() => {
                    this.createEventForm.reset();
                }),
                catchError((err) => {
                    this.toastr.error('Щось пішло не так');
                    return EMPTY;
                })
            );
    }
}
