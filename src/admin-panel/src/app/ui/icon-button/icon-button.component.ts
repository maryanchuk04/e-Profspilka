import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    imports: [NgClass]
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
