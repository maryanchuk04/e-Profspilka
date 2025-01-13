import { IconMenuItem } from 'src/app/models/ui-models/MenuItem';

import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    imports: [NgClass, NgFor, MenuItemComponent]
})
export class SidenavComponent implements OnInit {
	@Input() menu: IconMenuItem[];
	@Input() isExpanded: boolean = true;

	constructor() {}

	ngOnInit(): void {}

	toggleExpansion(): void {
		this.isExpanded = !this.isExpanded;
	}
}
