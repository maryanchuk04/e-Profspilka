import { first, Subject, Subscription, } from 'rxjs';
import { Event, } from 'src/app/models/Event';
import { EventsService, } from 'src/app/services/events.service';
import { FileUploaderService, } from 'src/app/services/file-uploader.service';
import AppState from 'src/app/store';
import { updateEvent, } from 'src/app/store/actions/events.action';

import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { Store, } from '@ngrx/store';
import { NgIf, NgFor } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { ButtonComponent } from '../../../ui/button/button.component';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '../../../ui/editor/editor.component';
import { IconButtonComponent } from '../../../ui/icon-button/icon-button.component';
import { ModalComponent } from '../../modal/modal.component';
import { DragDropDirective } from '../../../directives/drag-drop.directive';

@Component({
    selector: 'app-event-update',
    templateUrl: './event-update.component.html',
    imports: [NgIf, LoaderComponent, ButtonComponent, FormsModule, EditorComponent, NgFor, IconButtonComponent, ModalComponent, DragDropDirective]
})
export class EventUpdateComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	loading: boolean = true;
	event: Event;
	open: boolean = false;
	image: string | null = null;

	destroy$ = new Subject<void>();

	constructor(
		private route: ActivatedRoute,
		private service: EventsService,
		private router: Router,
		private store: Store<AppState>,
		private uploader: FileUploaderService
	) {}

	ngOnInit(): void {
		this.subscription = this.route.params.subscribe(({ id }) =>
			this.service
				.getById(id)
				.pipe(first())
				.subscribe((x) => {
					this.event = x;
					this.loading = false;
				})
		);
	}

	navigateBack() {
		this.router.navigate(['/moderation/events']);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	deleteImage(image: string) {
		this.event = {
			...this.event,
			images: this.event.images.filter((f) => f !== image),
		};
	}

	submit() {
		this.store.dispatch(updateEvent({ event: { ...this.event } }));
	}

	uploadFile(file: File) {
		this.uploader.uploadImage(file).subscribe((res) => {
			this.image = res;
		});
	}

	addImage() {
		this.event.images.push(this.image);
		this.image = null;
		this.handleModal(false);
	}

	handleModal(value: boolean) {
		this.open = value;
	}
}
