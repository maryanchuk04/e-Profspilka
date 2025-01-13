import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    standalone: false
})
export class LoaderComponent implements OnInit {
    @Input() className: string = '';
    constructor() {}

    ngOnInit(): void {}
}
