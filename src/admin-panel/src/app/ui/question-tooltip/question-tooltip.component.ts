import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-question-tooltip',
    templateUrl: './question-tooltip.component.html',
    styleUrls: ['./question-tooltip.component.css'],
    imports: [NgIf]
})
export class QuestionTooltipComponent implements OnInit {
	@Input() tooltipText: string = '';
	showTooltip: boolean = false;
	constructor() {}

	ngOnInit(): void {}
}
