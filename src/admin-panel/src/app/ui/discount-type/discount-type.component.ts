import { DiscountType, } from 'src/app/models/DiscountType';

import { Component, Input, OnInit, } from '@angular/core';

@Component({
	selector: 'app-discount-type',
	templateUrl: './discount-type.component.html',
})
export class DiscountTypeComponent implements OnInit {
	@Input() discoutType: DiscountType;

	DiscountType = DiscountType;

	constructor() {}

	ngOnInit(): void {}
}
