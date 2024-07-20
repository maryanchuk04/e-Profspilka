import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-moderation-header',
	templateUrl: './moderation-header.component.html',
})
export class ModerationHeaderComponent implements OnInit {
	@Output() handleAdd: EventEmitter<any> = new EventEmitter();
	constructor() { }

	ngOnInit(): void {
	}

	handleClick() {
		this.handleAdd.emit();
	}
}
