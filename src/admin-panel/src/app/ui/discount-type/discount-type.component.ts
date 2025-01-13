import { DiscountType, } from 'src/app/models/DiscountType';

import { Component, Input, OnInit, } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
    selector: 'app-discount-type',
    templateUrl: './discount-type.component.html',
    imports: [NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class DiscountTypeComponent implements OnInit {
	@Input() discoutType: DiscountType;

	DiscountType = DiscountType;

	constructor() {}

	ngOnInit(): void {}
}
