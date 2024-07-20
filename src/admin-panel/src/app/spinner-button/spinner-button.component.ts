import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-spinner-button',
    templateUrl: './spinner-button.component.html',
})
export class SpinnerButtonComponent {
    @Input() loading: boolean;
    @Input() classStyles = '';
    @Input() type: 'primary' | 'secondary' = 'primary';
    @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

    click(): void {
        if (!this.loading) {
            this.onClick.emit();
        }
    }

    styles(): string {
        if (this.type === 'secondary')
            return 'text-black disabled:opacity-30 w-fit duration-300 px-4 bg-transparent border-black border rounded-standart text-xl h-12 font-regular enabled:hover:bg-black/10 w-fit';

        return 'w-full duration-300 disabled:opacity-30 h-12 font-regular rounded-standart text-xl bg-primary text-white enabled:hover:bg-primary/80 duration-200 disabled:cursor-not-allowed';
    }
}
