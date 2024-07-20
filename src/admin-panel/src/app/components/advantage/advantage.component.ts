import { Advantage } from 'src/app/models/Advantage';
import AppState from 'src/app/store';
import { deleteAdvantage, updateAdvantage } from 'src/app/store/actions/advantage.action';

import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-advantage',
	templateUrl: './advantage.component.html',
})
export class AdvantageComponent implements OnInit {
	@Input() advantage: Advantage;
	adv: Advantage;
	isEditOpen = false;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.adv = { ...this.advantage };
	}

	delete() {
		this.store.dispatch(deleteAdvantage({ id: this.advantage.id }));
	}

	edit() {
		this.isEditOpen = true;
	}

	closeEdit() {
		this.isEditOpen = false;
	}

	updateAdvantage() {
		this.store.dispatch(updateAdvantage({ advantage: this.adv }));
	}

	get disabled(): boolean {
		return (
			this.adv.mainText === '' ||
			this.adv.subText === '' ||
			(this.adv.mainText === this.advantage.mainText &&
				this.adv.subText === this.advantage.subText)
		);
	}
}
