import { IconMenuItem } from 'src/app/models/ui-models/MenuItem';
import { administratorLinks } from 'src/app/utils/links';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
	links: IconMenuItem[] = administratorLinks;
	constructor() {}

	ngOnInit(): void {}
}
