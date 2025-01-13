import { IconMenuItem, MenuItem, } from 'src/app/models/ui-models/MenuItem';

import { Component, Input, OnInit, } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    imports: [RouterLinkActive, RouterLink, NgClass]
})
export class MenuItemComponent implements OnInit {
	@Input() menuItem: IconMenuItem;
	@Input() isTextVisible: boolean = true;

	constructor() {}

	ngOnInit(): void {}
}
