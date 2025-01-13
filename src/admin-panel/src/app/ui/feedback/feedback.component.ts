import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
    imports: [NgIf]
})
export class FeedbackComponent implements OnInit {
	@Input() text: string = '';
	@Input() iconClass: string = '';
	@Input() class: string = '';
	@Input() dismissable = false;

	@Output() close = new EventEmitter<void>();

	open = true;

	constructor() {}

	ngOnInit(): void {}

	handleClose() {
		this.open = false;
		this.close.emit();
	}
}
