import AppState from 'src/app/store';
import { fetchPartners } from 'src/app/store/actions/partners.action';

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    imports: [RouterOutlet]
})
export class PartnersComponent implements OnInit {
	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(fetchPartners());
	}

}
