import { Observable, Subscription, } from 'rxjs';
import { Role, roleResolver, } from 'src/app/models/roles';
import { User, } from 'src/app/models/User';
import AppState from 'src/app/store';
import { fetchAllUsers, fetchUsers, } from 'src/app/store/actions/user.action';
import { selectUserLoading, selectUsers, } from 'src/app/store/selectors/user.selector';

import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router, } from '@angular/router';
import { Store, } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../../loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    imports: [FormsModule, NgIf, LoaderComponent, NgFor, NgxPaginationModule, AsyncPipe]
})
export class UsersTableComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    isEdit: boolean = false;
    activeUser: User | null = null;

    users: User[];
    loading$: Observable<boolean>;

    public currentPage = 1;
    public itemsPerPage = 7;
    public searchText = '';
    constructor(private store: Store<AppState>, private router: Router) {}

    ngOnInit(): void {
        this.loading$ = this.store.select(selectUserLoading);
        this.subscription = this.store.select(selectUsers).subscribe((x) => {
            this.users = x;
        });
    }

    public get filteredUsers(): User[] {
        if (!this.searchText) {
            return this.users;
        }

        return this.users.filter(
            (user) =>
                user.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
                user.email.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }

    handleEdit(value: boolean = false, id: string = '') {
        if (value) {
            this.activeUser = this.users.filter((x) => x.id === id)[0];
            this.isEdit = value;
        } else {
            this.isEdit = value;
            this.activeUser = null;
        }
    }

    onPageChange(event: any): void {
        this.currentPage = event;
    }

    isActiveChange(values: any): void {
        if (values.currentTarget.checked) {
            this.store.dispatch(fetchUsers());
            return;
        }

        this.store.dispatch(fetchAllUsers());
    }

    roleResolve(role: Role): string {
        return roleResolver(role);
    }

    navigateToUser(id: string) {
        this.router.navigate(['administration/users', id]);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
