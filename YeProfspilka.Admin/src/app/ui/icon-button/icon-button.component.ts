import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-icon-button',
	templateUrl: './icon-button.component.html',
})
export class IconButtonComponent implements OnInit {
	@Input() icon: string;
	@Input() className: string = '';
	@Output() handleClick: EventEmitter<any> = new EventEmitter();
	constructor() { }

	ngOnInit(): void { }

	click() {
		this.handleClick.emit();
	}
}
