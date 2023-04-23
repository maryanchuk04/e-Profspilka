import { Advantage } from 'src/app/models/Advantage';
import AppState from 'src/app/store';
import { deleteAdvantage } from 'src/app/store/actions/advantage.action';

import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-advantage',
	templateUrl: './advantage.component.html',
})
export class AdvantageComponent implements OnInit {
	@Input() advantage: Advantage;

	constructor(private store: Store<AppState>) { }

	ngOnInit(): void { }

	delete() {
		this.store.dispatch(deleteAdvantage({ id: this.advantage.id }));
	}
}
