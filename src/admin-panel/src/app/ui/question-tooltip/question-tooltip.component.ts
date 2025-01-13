import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-question-tooltip',
    templateUrl: './question-tooltip.component.html',
    styleUrls: ['./question-tooltip.component.css'],
    standalone: false
})
export class QuestionTooltipComponent implements OnInit {
	@Input() tooltipText: string = '';
	showTooltip: boolean = false;
	constructor() {}

	ngOnInit(): void {}
}
