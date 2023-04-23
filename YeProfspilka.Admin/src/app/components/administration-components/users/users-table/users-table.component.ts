import { Observable, Subscription } from 'rxjs';
import { Role, roleResolver } from 'src/app/models/roles';
import { User } from 'src/app/models/User';
import AppState from 'src/app/store';
import { fetchAllUsers, fetchUsers } from 'src/app/store/actions/user.action';
import { selectUserLoading, selectUsers } from 'src/app/store/selectors/user.selector';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-users-table',
	templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	isEdit: boolean = false;
	activeUser: User | null = null;

	users: User[];
	loading$: Observable<boolean>;

	public currentPage = 1;
	public itemsPerPage = 10;
	public searchText = '';
	constructor(private store: Store<AppState>) { }


	ngOnInit(): void {
		this.loading$ = this.store.select(selectUserLoading);
		this.subscription = this.store.select(selectUsers).subscribe(x => this.users = x);
	}

	public get filteredUsers(): User[] {
		if (!this.searchText) {
			return this.users;
		}

		return this.users.filter(user =>
			user.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
			user.email.toLowerCase().includes(this.searchText.toLowerCase())
		);
	}

	handleEdit(value: boolean = false, id: string = '') {
		if (value) {
			this.activeUser = this.users.filter(x => x.id === id)[0];
			this.isEdit = value;
		} else {
			this.isEdit = value;
			this.activeUser = null;
		}
	}

	public get pagedUsers(): User[] {
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;

		return this.filteredUsers.slice(startIndex, endIndex);
	}

	public get totalPages(): number {
		return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
	}

	public previousPage(): void {
		this.currentPage--;
	}

	public nextPage(): void {
		this.currentPage++;
	}

	public roleResolve(role: Role): string {
		return roleResolver(role);
	}

	isActiveChange(values: any): void {
		if (values.currentTarget.checked) {
			this.store.dispatch(fetchUsers());
			return;
		}

		this.store.dispatch(fetchAllUsers());
	}


	public delete(id: string) {

	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}

