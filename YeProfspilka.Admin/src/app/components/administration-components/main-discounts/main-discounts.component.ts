import { Observable, } from 'rxjs';
import { Discount, } from 'src/app/models/Discount';
import AppState from 'src/app/store';
import {
	createDiscount, deleteDiscount, fetchDiscounts,
} from 'src/app/store/actions/discounts.actions';
import {
	selectDiscountsData, selectDiscountsLoading,
} from 'src/app/store/selectors/discounts.selector';

import { Component, OnInit, } from '@angular/core';
import { Router, } from '@angular/router';
import { Store, } from '@ngrx/store';

@Component({
	selector: 'app-main-discounts',
	templateUrl: './main-discounts.component.html',
})
export class MainDiscountsComponent implements OnInit {
	discounts$: Observable<Discount[]>;
	loading$: Observable<boolean>;

	open: boolean = false;
	codeWord: string = '';
	name: string = '';
	isOpen: boolean | null = null;
	description: string = '';

	constructor(private store: Store<AppState>, private router: Router) {}

	ngOnInit(): void {
		this.store.dispatch(fetchDiscounts());
		this.discounts$ = this.store.select(selectDiscountsData);
		this.loading$ = this.store.select(selectDiscountsLoading);
	}

	navigateNewDiscount() {
		this.router.navigate(['/administration/discounts/create']);
	}

	closeAndReset() {
		this.name = '';
		this.codeWord = '';
		this.isOpen = null;
		this.description = '';
	}

	delete(id: string) {
		this.store.dispatch(deleteDiscount({ id }));
	}
}
