import { TagModule } from 'primeng/tag';
import { Role, roleResolver } from 'src/app/models/roles';

import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    imports: [NgIf,TagModule],
})
export class RoleComponent implements OnInit {
    @Input() roles: Role[];

    roleLabel: string | null;

    constructor() {}

    ngOnInit(): void {
        console.log(this.roles);
        this.roleLabel = this.getRoleLabel();
    }

    getRoleLabel() {
        return roleResolver(this.roles);
    }
}
