import { Event } from 'src/app/models/Event';
import AppState from 'src/app/store';
import { deleteEvent } from 'src/app/store/actions/events.action';
import { environment } from 'src/environments/environment';

import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-event-card',
	templateUrl: './event-card.component.html',
})
export class EventCardComponent implements OnInit {
	@Input() event: Event;

	constructor(private store: Store<AppState>, @Inject(DOCUMENT) private document: Document, private route: Router) { }

	ngOnInit(): void { }

	navigateToView() {
		window.open(`${environment.clientUrl}/event/${this.event.id}`, '_blank');
	}

	navigateToOptions() {
		this.route.navigate(['moderation/events/', this.event.id])
	}

	delete() {
		this.store.dispatch(deleteEvent({ id: this.event.id }))
	}
}
