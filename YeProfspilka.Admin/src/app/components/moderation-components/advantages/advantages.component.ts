import { Observable } from 'rxjs';
import { Advantage } from 'src/app/models/Advantage';
import AppState from 'src/app/store';
import { createAdvantage, fetchAdvantage } from 'src/app/store/actions/advantage.action';
import {
    selectAdvantages, selectAdvantagesLoading
} from 'src/app/store/selectors/advantage.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-advantages',
	templateUrl: './advantages.component.html',
})
export class AdvantagesComponent implements OnInit {
	loading$: Observable<boolean>;
	advantages$: Observable<Advantage[]>;

	open: boolean = false;
	mainText: string = '';
	subText: string = '';

	constructor(private store: Store<AppState>) { }

	ngOnInit(): void {
		this.store.dispatch(fetchAdvantage());
		this.advantages$ = this.store.select(selectAdvantages);
		this.loading$ = this.store.select(selectAdvantagesLoading);
	}

	handleModal(value: boolean = false) {
		this.open = value;
	}

	submit() {
		this.store.dispatch(createAdvantage({
			advantage: {
				mainText: this.mainText,
				subText: this.subText
			} as Advantage
		}))

		this.reset();
		this.handleModal();
	}

	private reset() {
		this.mainText = '';
		this.subText = '';
	}
}
