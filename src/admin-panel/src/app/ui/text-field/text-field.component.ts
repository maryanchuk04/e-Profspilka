import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
    selector: 'app-text-field',
    templateUrl: './text-field.component.html',
})
export class TextFieldComponent implements OnInit {
    @Input() type: string = 'text';
    @Input() classStyles: string = '';
    @Input() placeholder: string = '';
    @Input() value: string = '';
    @Input() defaultValue: string = '';
    @Input() controlName: string = null;
    @Output() valueChange = new EventEmitter<string>();

    form: FormGroup = null;

    constructor(@Optional() private formGroupDirective: FormGroupDirective) {}

    ngOnInit(): void {
        if (this.controlName && this.formGroupDirective) {
            this.form = this.formGroupDirective.control;
        }
    }
}
