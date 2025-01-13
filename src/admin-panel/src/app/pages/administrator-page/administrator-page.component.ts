import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ContainerComponent } from '../../shared/container/container.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-administrator-page',
    templateUrl: './administrator-page.component.html',
    imports: [HeaderComponent, SidebarComponent, ContainerComponent, RouterOutlet]
})
export class AdministratorPageComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
