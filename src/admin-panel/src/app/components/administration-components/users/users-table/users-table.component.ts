import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';
import { UserManagementModel } from 'src/app/models/UserManagementModel';
import { PaginationResponse } from 'src/app/models/pagination';
import { debounceTime, distinctUntilChanged, filter, first, Subscription } from 'rxjs';
import { UtcToLocalPipe } from '../../../../core/pipes/utcToLocal.pipe';
import { BoolToLogicalTextPipe } from 'src/app/core/pipes/boolToLogicalText.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    standalone: true,
    imports: [TableModule, InputTextModule, ReactiveFormsModule, UtcToLocalPipe, BoolToLogicalTextPipe],
})
export class UsersTableComponent implements OnInit {
    users: PaginationResponse<UserManagementModel> | null = null;
    loading = false;

    currentPage = 1;
    itemsPerPage = 10;

    searchControl = new FormControl('');
    private subscription = new Subscription();

    constructor(
        private userManagementService: UserManagementService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
            const searchFromUrl = params.get('search') || '';
            this.searchControl.setValue(searchFromUrl, { emitEvent: false });
            this.loadUsers();
        });

        this.subscription.add(
            this.searchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value) => {
                this.currentPage = 1;
                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: { search: value || null },
                    queryParamsHandling: 'merge',
                });
                this.loadUsers();
            })
        );
    }

    loadUsers(): void {
        this.loading = true;

        this.userManagementService
            .getUsers({
                pageNumber: this.currentPage,
                pageSize: this.itemsPerPage,
                searchTerm: this.searchControl.value ?? '',
            })
            .pipe(first())
            .subscribe((response) => {
                this.users = response;
                this.loading = false;
            });
    }

    navigateToUser(id: string): void {
        this.router.navigate(['administration/users', id]);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
