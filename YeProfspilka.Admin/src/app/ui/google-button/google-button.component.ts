import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-google-button',
	templateUrl: './google-button.component.html',
})
export class GoogleButtonComponent implements OnInit {
	@Output() handleClick: EventEmitter<void> = new EventEmitter<void>();
	constructor() {}

	ngOnInit(): void {}

	click() {
		console.log('work');
		this.handleClick.emit();
	}
}
