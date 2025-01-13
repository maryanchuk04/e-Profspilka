import { IconMenuItem, MenuItem } from 'src/app/models/ui-models/MenuItem';
import { Link, moderationsLinks } from 'src/app/utils/links';

import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../../sidenav/sidenav.component';

@Component({
    selector: 'app-moderation-sidebar',
    templateUrl: './moderation-sidebar.component.html',
    imports: [SidenavComponent]
})
export class ModerationSidebarComponent implements OnInit {
	links: IconMenuItem[] = moderationsLinks;

	activeClass: string = '';

	constructor() {}

	ngOnInit(): void {}
}
