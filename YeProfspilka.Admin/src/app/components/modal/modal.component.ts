import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
	@Output() close: EventEmitter<any> = new EventEmitter();
	constructor() { }

	ngOnInit(): void { }

	handleClose() {
		this.close.emit();
	}

	onEvent(event: any) {
		event.stopPropagation();
	}
}
