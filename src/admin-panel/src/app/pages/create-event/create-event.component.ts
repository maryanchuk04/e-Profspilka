import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { catchError, EMPTY, first, tap } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { EventsService } from 'src/app/services/events.service';

import { DatePipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';

import { ContainerComponent } from '../../shared/container/container.component';
import { EditorComponent } from '../../ui/editor/editor.component';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    standalone: true,
    imports: [
        ContainerComponent,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        SelectModule,
        ButtonModule,
        EditorComponent,
        NgIf,
        DatePipe,
        FileUploadModule,
    ],
})
export class CreateEventComponent implements OnInit {
    createEventForm: FormGroup;

    constructor(private fb: FormBuilder, private toastr: ToastrService, private eventService: EventsService) {}

    selectedImages: File[] = [];

    onImageSelect(event: any) {
        this.selectedImages = Array.from(event.files);
      }

    ngOnInit(): void {
        this.createEventForm = this.fb.group({
            title: ['', Validators.required],
            date: ['', Validators.required],
            shortDescription: ['', Validators.required],
            description: ['', Validators.required],
            // status: ['draft', Validators.required], // Default status
        });
    }

    createEvent() {
        console.log(this.createEventForm);

        if (this.createEventForm.invalid) return;

        const eventPayload: Event = {
            ...this.createEventForm.value,
        };

        this.eventService
            .create(eventPayload, this.selectedImages)
            .pipe(
                first(),
                tap(() => {
                    this.toastr.success('Подія успішно створена');
                    this.createEventForm.reset();
                    this.selectedImages = [];
                }),
                catchError((err) => {
                    this.toastr.error('Щось пішло не так при створенні події');
                    return EMPTY;
                })
            )
            .subscribe();
    }
}
