import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { ModerationSidebarComponent } from '../../components/moderation-components/moderation-sidebar/moderation-sidebar.component';
import { ContainerComponent } from '../../shared/container/container.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-moderation-page',
    templateUrl: './moderation-page.component.html',
    imports: [HeaderComponent, ModerationSidebarComponent, ContainerComponent, RouterOutlet]
})
export class ModerationPageComponent implements OnInit {
	constructor() { }

	ngOnInit(): void {
	}

}
