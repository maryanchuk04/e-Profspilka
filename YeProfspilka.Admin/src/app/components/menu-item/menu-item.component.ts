import { IconMenuItem, MenuItem, } from 'src/app/models/ui-models/MenuItem';

import { Component, Input, OnInit, } from '@angular/core';

@Component({
	selector: 'app-menu-item',
	templateUrl: './menu-item.component.html',
})
export class MenuItemComponent implements OnInit {
	@Input() menuItem: IconMenuItem;
	@Input() isTextVisible: boolean = true;

	constructor() {}

	ngOnInit(): void {}
}
