import { Component, Input, OnInit } from '@angular/core';
import { SvgService } from './svg.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-svg',
    templateUrl: './svg.component.html',
    imports: [NgClass]
})
export class SvgComponent implements OnInit {
	@Input() classNames = '';
	@Input() name: string = '';

	constructor(private svgService: SvgService) {}

	ngOnInit(): void {}

	svg = (): string => this.svgService.getSvg(this.name);
}
