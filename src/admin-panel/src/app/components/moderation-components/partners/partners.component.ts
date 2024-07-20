import { Observable } from 'rxjs';
import { Partner } from 'src/app/models/Partners';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import AppState from 'src/app/store';
import { createPartner, fetchPartners } from 'src/app/store/actions/partners.action';
import {
	selectPartnersData,
	selectPartnersLoading,
} from 'src/app/store/selectors/partners.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-partners',
	templateUrl: './partners.component.html',
})
export class PartnersComponent implements OnInit {
	open: boolean = false;

	// Form data
	mainText: string = '';
	subText: string = '';
	subTestLink: string = '';
	image: string = '';
	file: File | null = null;

	loading$: Observable<boolean>;
	partners$: Observable<Partner[]>;

	constructor(private store: Store<AppState>, private uploadService: FileUploaderService) {}

	ngOnInit(): void {
		this.store.dispatch(fetchPartners());
		this.partners$ = this.store.select(selectPartnersData);
		this.loading$ = this.store.select(selectPartnersLoading);
	}

	handleOpen(value: boolean): void {
		this.open = value;
	}

	handleFileDrop(file: File) {
		this.file = file;
		this.uploadService.uploadImage(file).subscribe((url) => {
			this.image = url;
		});
	}

	submit() {
		const partner: Partner = {
			mainText: this.mainText,
			subText: this.subText,
			subTextLink: this.subTestLink,
			image: this.image,
		} as Partner;

		this.store.dispatch(createPartner({ partner }));
		this.handleOpen(false);

		this.file = null;
		this.image = '';
		this.mainText = '';
		this.subTestLink = '';
		this.subText = '';
	}
}
