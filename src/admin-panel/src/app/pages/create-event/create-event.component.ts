import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';
import { createEvent } from 'src/app/store/actions/events.action';
import { ContainerComponent } from '../../shared/container/container.component';
import { TextFieldComponent } from '../../ui/text-field/text-field.component';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { EditorComponent } from '../../ui/editor/editor.component';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    imports: [ContainerComponent, FormsModule, ReactiveFormsModule, TextFieldComponent, DragDropDirective, EditorComponent, ButtonComponent]
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
