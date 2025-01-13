import { Component, OnInit, } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [NgTemplateOutlet]
})
export class DashboardComponent implements OnInit {
	constructor() {}
	single: any[];
	view: any[] = [700, 400];

	// options
	gradient: boolean = true;
	showLegend: boolean = true;
	showLabels: boolean = true;
	isDoughnut: boolean = false;
	legendPosition: string = 'below';

	ngOnInit(): void {}

	colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
	};
}
