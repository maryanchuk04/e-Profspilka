import { catchError, Observable, of, Subject, takeUntil, tap, } from 'rxjs';
import { UploadFileResults, } from 'src/app/models/UploadFileResults';
import { StudentStoreService, } from 'src/app/services/student-store.service';
import AppState from 'src/app/store';
import { fetchAllUsers, } from 'src/app/store/actions/user.action';
import { selectUserLoading, } from 'src/app/store/selectors/user.selector';

import { Component, OnInit, } from '@angular/core';
import { Router, } from '@angular/router';
import { Store, } from '@ngrx/store';
import { SpinnerButtonComponent } from '../../../../spinner-button/spinner-button.component';
import { ButtonComponent } from '../../../../ui/button/button.component';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    imports: [SpinnerButtonComponent, ButtonComponent, UsersTableComponent]
})
export class MainComponent implements OnInit {
	loading$: Observable<boolean>;
	open: boolean = false;
	file: File | null = null;
	result: UploadFileResults | null = null;
	isSpinning = false;
	destroy$: Subject<void> = new Subject();

	constructor(
		private store: Store<AppState>,
		private studentStore: StudentStoreService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.store.dispatch(fetchAllUsers());
		this.loading$ = this.store.select(selectUserLoading);
	}

	handleOpen(value: boolean = false) {
		this.router.navigate(['administration/users-manager-panel']);
	}

	export() {
		this.isSpinning = true;
		this.studentStore
			.exportUsers()
			.pipe(
				tap(() => (this.isSpinning = false)),
				takeUntil(this.destroy$),
				catchError(() => {
					this.isSpinning = false;
					return of(undefined);
				})
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
