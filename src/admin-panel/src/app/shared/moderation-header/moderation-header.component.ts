import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-moderation-header',
    templateUrl: './moderation-header.component.html',
    imports: [ButtonModule],
})
export class ModerationHeaderComponent implements OnInit {
    @Input() buttonLabel: string = '';

    @Output() handleAdd: EventEmitter<any> = new EventEmitter();
    constructor() {}

    ngOnInit(): void {}

    handleClick() {
        this.handleAdd.emit();
    }
}
