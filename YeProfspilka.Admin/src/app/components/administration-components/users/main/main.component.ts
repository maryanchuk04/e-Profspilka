import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';

import { UploadFileResults } from 'src/app/models/UploadFileResults';
import { StudentStoreService } from 'src/app/services/student-store.service';
import AppState from 'src/app/store';
import { fetchAllUsers } from 'src/app/store/actions/user.action';
import { selectUserLoading } from 'src/app/store/selectors/user.selector';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
    loading$: Observable<boolean>;
    open: boolean = false;
    file: File | null = null;
    result: UploadFileResults | null = null;
    isSpinning = false;
    destroy$: Subject<void> = new Subject();

    constructor(private store: Store<AppState>, private studentStore: StudentStoreService, private router: Router) {}

    ngOnInit(): void {
        console.log('hi');
        this.store.dispatch(fetchAllUsers());
        this.loading$ = this.store.select(selectUserLoading);
    }

    handleOpen(value: boolean = false) {
        this.router.navigate(['administration/users-manager-panel']);
    }

    uploadFile(file: File) {
        this.file = file;
        this.studentStore.uploadUsers({ file: this.file, isOverrideMethod: true }).subscribe((res) => {
            this.result = res;
        });
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
