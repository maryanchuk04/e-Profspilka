import { Observable } from 'rxjs';
import { Discount } from 'src/app/models/Discount';
import AppState from 'src/app/store';
import {
    createDiscount, deleteDiscount, fetchDiscounts
} from 'src/app/store/actions/discounts.actions';
import {
    selectDiscountsData, selectDiscountsLoading
} from 'src/app/store/selectors/discounts.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-discounts',
	templateUrl: './discounts.component.html',
})
export class DiscountsComponent implements OnInit {
	discounts$: Observable<Discount[]>;
	loading$: Observable<boolean>;

	open: boolean = false;
	codeWord: string = '';
	name: string = '';
	isOpen: boolean | null = null;
	description: string = '';

	constructor(private store: Store<AppState>) { }

	ngOnInit(): void {
		this.store.dispatch(fetchDiscounts());
		this.discounts$ = this.store.select(selectDiscountsData);
		this.loading$ = this.store.select(selectDiscountsLoading);

		this.discounts$.subscribe(x => console.log(x));
	}

	handleModal(value: boolean = false) {
		this.open = value;
	}

	closeAndReset() {
		this.name = '';
		this.codeWord = '';
		this.isOpen = null;
		this.description = '';
		this.handleModal();
	}

	handleSubmit() {
		this.store.dispatch(createDiscount({
			discount: {
				name: this.name,
				codeWord: this.codeWord,
				isOpen: Boolean(+this.isOpen),
				description: this.description
			} as Discount
		}))

		this.closeAndReset();
	}

	delete(id: string) {
		this.store.dispatch(deleteDiscount({ id }));
	}
}
