import { IconMenuItem } from 'src/app/models/ui-models/MenuItem';

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css'],
    standalone: false
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
