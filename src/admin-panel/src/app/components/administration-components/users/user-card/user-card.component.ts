import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { catchError, EMPTY, first, iif, tap } from 'rxjs';
import { Role } from 'src/app/models/roles';
import { UserManagementModel } from 'src/app/models/UserManagementModel';
import { UserManagementService } from 'src/app/services/user-management.service';

import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UtcToLocalPipe } from '../../../../core/pipes/utcToLocal.pipe';
import { LoaderComponent } from '../../../loader/loader.component';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    imports: [
        NgIf,
        LoaderComponent,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        MultiSelectModule,
        ButtonModule,
        CardModule,
        InputNumberModule,
        NgClass,
        UtcToLocalPipe,
        TagModule,
        ConfirmDialogModule,
    ],
})
export class UserCardComponent implements OnInit {
    user: UserManagementModel | null = null;
    isEditMode = false;
    form: FormGroup;

    availableRoles: SelectItem[] = [
        { label: 'Адміністратор', value: Role.admin },
        { label: 'Модератор', value: Role.moderator },
        { label: 'Член профспілки', value: Role.member },
        { label: 'Студент', value: Role.student },
        { label: 'Не верифікований', value: Role.notVerified },
    ];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userManagementService: UserManagementService,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(({ userId }) => {
            this.userManagementService.getUserManagementEntity(userId).subscribe({
                next: (user) => {
                    this.user = user;
                    this.initForm();
                },
                error: () => {
                    this.router.navigate(['/administration/users']);
                },
            });
        });
    }

    initForm(): void {
        this.form = this.fb.group({
            faculty: [this.user?.faculty || '', Validators.required],
            course: [this.user?.course || 0, [Validators.required, Validators.min(0)]],
            roles: [this.user?.roles || [], Validators.required],
            fullName: [this.user.fullName, Validators.required],
        });
    }

    goBack(): void {
        this.router.navigate(['/administration/users']);
    }

    submit(): void {
        console.log(this.form);

        if (this.form.invalid) return;

        const updatedUser = {
            ...this.user,
            faculty: this.form.value.faculty,
            course: this.form.value.course,
            roles: this.form.value.roles,
        };

        this.userManagementService
            .updateUser(updatedUser)
            .pipe(
                first(),
                tap(() => {
                    this.toastr.success('Дані користувача оновлено', 'Успішно');
                }),
                catchError(() => {
                    this.toastr.error('Не вдалося оновити дані користувача', 'Помилка');
                    return EMPTY;
                })
            )
            .subscribe();

        this.user = updatedUser;
        this.isEditMode = false;
    }

    confirmChangeUserState() {
        const operation = this.user.isActive ? 'деактивувати' : 'активувати';
        const effects = this.user.isActive ? 'не зможе' : 'знову зможе';

        this.confirmationService.confirm({
            message: `Ви справді хочете <b>${operation}</b> цього користувача?</br>Після цих дій користувач ${effects} увійти в систему!`,
            accept: () => {
                this.changeStateForUser();
            },
        });
    }

    changeStateForUser() {
        if (!this.user) return;

        const changeStateOperation = iif(
            () => this.user.isActive,
            this.userManagementService.deactivateUser(this.user.id),
            this.userManagementService.activateUser(this.user.id)
        );

        const successOperation = this.user.isActive ? 'деактивовано' : 'активовано';
        const failedOperation = this.user.isActive ? 'деактивувати' : 'активувати';

        changeStateOperation.pipe(
            first(),
            tap(() => {
                this.toastr.success(`Користувача ${successOperation}`, 'Успішно');
                this.user.isActive = !this.user.isActive;
            }),
            catchError(() => {
                this.toastr.error(`Не вдалося ${failedOperation} користувача`, 'Помилка');
                return EMPTY;
            })
        ).subscribe();
    }

    get changeStateLabel(): string {
        return this.user.isActive ? 'Деактивувати' : 'Активувати';
    }
}
