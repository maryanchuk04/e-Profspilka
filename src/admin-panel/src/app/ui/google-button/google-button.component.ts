import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SvgComponent } from '../../shared/svg/svg.component';

@Component({
    selector: 'app-google-button',
    templateUrl: './google-button.component.html',
    imports: [SvgComponent]
})
export class GoogleButtonComponent implements OnInit {
	@Output() handleClick: EventEmitter<void> = new EventEmitter<void>();
	constructor() {}

	ngOnInit(): void {}

	click() {
		this.handleClick.emit();
	}
}
