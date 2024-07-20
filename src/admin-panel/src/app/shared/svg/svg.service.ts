import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class SvgService {
	constructor() {}

	getSvg(name: string): string {
		return `/assets/svgs/${name}.svg`;
	}
}
