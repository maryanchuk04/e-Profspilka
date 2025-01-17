import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgSwitch } from '@angular/common';
import { Role, roleResolver } from 'src/app/models/roles';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    imports: [NgIf, NgSwitch],
})
export class RoleComponent implements OnInit {
    @Input() role: Role;

    roleLabel: string | null;

    constructor() {}

    ngOnInit(): void {
        this.roleLabel = this.getRoleLabel();
    }

    getRoleLabel() {
        return roleResolver(this.role);
    }
}
