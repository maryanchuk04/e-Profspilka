import { environment } from 'src/environments/environment';

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { UserPermissionService } from 'src/app/core/user-permission.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    imports: [HeaderComponent, NgIf, ButtonComponent],
})
export class MainPageComponent implements OnInit {
    isAdminOrModerator: boolean;

    constructor(private userPermissionService: UserPermissionService) {}

    ngOnInit(): void {
        this.isAdminOrModerator = this.userPermissionService.hasAccessToAdminPanel();
    }

    handleNavigate() {
        window.open(environment.clientUrl);
    }
}
