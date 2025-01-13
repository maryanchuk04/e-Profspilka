import { Observable } from 'rxjs';
import { Advantage } from 'src/app/models/Advantage';
import AppState from 'src/app/store';
import { createAdvantage, fetchAdvantage } from 'src/app/store/actions/advantage.action';
import {
    selectAdvantages, selectAdvantagesLoading
} from 'src/app/store/selectors/advantage.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { ModerationHeaderComponent } from '../../../shared/moderation-header/moderation-header.component';
import { AdvantageComponent } from '../../advantage/advantage.component';
import { ModalComponent } from '../../modal/modal.component';
import { TextFieldComponent } from '../../../ui/text-field/text-field.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
    selector: 'app-advantages',
    templateUrl: './advantages.component.html',
    imports: [NgIf, LoaderComponent, ModerationHeaderComponent, NgFor, AdvantageComponent, ModalComponent, TextFieldComponent, FormsModule, ButtonComponent, AsyncPipe]
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
