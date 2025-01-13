import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-discounts',
    templateUrl: './discounts.component.html',
    imports: [RouterOutlet]
})
export class DiscountsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
