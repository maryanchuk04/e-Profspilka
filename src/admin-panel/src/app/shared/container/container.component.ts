import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    standalone: false
})
export class ContainerComponent implements OnInit {
	@Input() classNames = '';
	constructor() { }

	ngOnInit(): void {
	}
}
