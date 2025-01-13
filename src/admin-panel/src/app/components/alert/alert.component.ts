import { Observable, tap } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import AppState from 'src/app/store';
import { closeAlert } from 'src/app/store/actions/alert.action';
import { AlertType } from 'src/app/store/reducers/alert.reducer';
import { selectAlertState } from 'src/app/store/selectors/alert.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { IconButtonComponent } from '../../ui/icon-button/icon-button.component';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    imports: [NgIf, NgClass, IconButtonComponent, AsyncPipe]
})
export class AlertComponent implements OnInit {
	alert$: Observable<Alert>;
	AlertType = AlertType;
	constructor(private store: Store<AppState>) { }

	ngOnInit(): void {
		this.alert$ = this.store.select(selectAlertState)

		this.alert$.subscribe(alert => {
			if (alert.open) {
				setTimeout(() => this.close(), alert.duration ?? 800000);
			}
		})
	}

	close() {
		this.store.dispatch(closeAlert());
	}
}
