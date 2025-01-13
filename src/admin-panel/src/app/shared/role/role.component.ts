import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgSwitch } from '@angular/common';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    imports: [NgIf, NgSwitch]
})
export class RoleComponent implements OnInit {
	@Input() role: number;

	roleLabel: string | null;

	constructor() {}

	ngOnInit(): void {
		this.roleLabel = this.getRoleLabel();
	}

	getRoleLabel() {
		switch (this.role) {
			case 2:
				return 'Член профспілки';
			case 3:
				return 'Модератор';
			case 1:
				return 'Студент';
			case 5:
				return 'Адмін';
			default:
				return 'Не Активований';
		}
	}
}
