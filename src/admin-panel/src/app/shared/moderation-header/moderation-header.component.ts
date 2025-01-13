import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
    selector: 'app-moderation-header',
    templateUrl: './moderation-header.component.html',
    imports: [ButtonComponent]
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
