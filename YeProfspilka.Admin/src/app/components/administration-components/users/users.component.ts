import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { catchError, Observable } from 'rxjs';

import { UploadFileResults } from 'src/app/models/UploadFileResults';
import { StudentStoreService } from 'src/app/services/student-store.service';
import AppState from 'src/app/store';
import { fetchAllUsers, fetchUsers } from 'src/app/store/actions/user.action';
import { selectUserLoading } from 'src/app/store/selectors/user.selector';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
    loading$: Observable<boolean>;
    open: boolean = false;
    file: File | null = null;
    result: UploadFileResults | null = null;

    constructor(private store: Store<AppState>, private studentStore: StudentStoreService, private router: Router) {}

    ngOnInit(): void {
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
        this.studentStore.exportUsers();
    }
}
