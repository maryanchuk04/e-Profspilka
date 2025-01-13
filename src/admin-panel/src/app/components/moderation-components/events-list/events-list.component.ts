import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Event } from 'src/app/models/Event';
import { Observable, tap } from 'rxjs';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import AppState from 'src/app/store';
import { fetchEvents } from 'src/app/store/actions/events.action';
import { selectEventsData, selectEventsLoading } from 'src/app/store/selectors/events.selector';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    standalone: false
})
export class EventsListComponent implements OnInit {

    loading$: Observable<boolean>;
	events$: Observable<Event[]>;

	open: boolean = false;
	editor: string = '';
	images: string[] = [];
	title: string = '';
	date: string = '';
	shortDescription: string = '';

	constructor(private store: Store<AppState>, private uploader: FileUploaderService, private router: Router) {}

	ngOnInit(): void {
		this.store.dispatch(fetchEvents());
		this.events$ = this.store.select(selectEventsData);
		this.loading$ = this.store.select(selectEventsLoading);
	}

    goToCreate() {
        this.router.navigate(['moderation/events/create']);
    }
}
