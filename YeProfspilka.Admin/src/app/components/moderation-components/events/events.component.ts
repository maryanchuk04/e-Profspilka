import { Observable, Subscription } from 'rxjs';
import { Event } from 'src/app/models/Event';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import AppState from 'src/app/store';
import { createEvent, fetchEvents } from 'src/app/store/actions/events.action';
import { selectEventsData, selectEventsLoading } from 'src/app/store/selectors/events.selector';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	loading$: Observable<boolean>;
	events$: Observable<Event[]>;

	open: boolean = false;
	editor: string = '';
	images: string[] = [];
	title: string = '';
	date: string = '';
	shortDescription: string = '';

	constructor(private store: Store<AppState>, private uploader: FileUploaderService) {}

	ngOnInit(): void {
		this.store.dispatch(fetchEvents());
		this.events$ = this.store.select(selectEventsData);
		this.loading$ = this.store.select(selectEventsLoading);
	}

	handleModal(value: boolean = false) {
		this.open = value;
	}

	resetAndClose() {
		this.reset();
		this.handleModal(false);
	}

	uploadFile(file: File) {
		this.subscription = this.uploader.uploadImage(file).subscribe((res) => {
			this.images.push(res);
		});
	}

	submit() {
		this.store.dispatch(
			createEvent({
				event: {
					title: this.title,
					images: this.images,
					description: this.editor,
					date: this.date,
					shortDescription: this.shortDescription,
				} as Event,
			})
		);
		this.resetAndClose();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private reset() {
		this.editor = '';
		this.images = [];
		this.title = '';
		this.date = '';
		this.shortDescription = '';
	}
}
