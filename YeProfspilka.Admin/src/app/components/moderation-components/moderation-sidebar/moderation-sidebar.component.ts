import { Link, moderationsLinks } from 'src/app/utils/links';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-moderation-sidebar',
	templateUrl: './moderation-sidebar.component.html',
})
export class ModerationSidebarComponent implements OnInit {
	links: Link[] = moderationsLinks;

	class: string = 'px-3 py-2 mb-3 text-2xl font-medium cursor-pointer hover:bg-black/20 duration-300 rounded-standart';
	activeClass: string = '';

	constructor() { }

	ngOnInit(): void { }
}
