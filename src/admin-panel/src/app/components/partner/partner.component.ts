import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Partner } from 'src/app/models/Partners';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import AppState from 'src/app/store';
import { deletePartner, updatePartner } from 'src/app/store/actions/partners.action';

@Component({
	selector: 'app-partner',
	templateUrl: './partner.component.html',
})
export class PartnerComponent implements OnInit {
	@Input() partner: Partner;
	open: boolean = false;
	file: File;
	mainText: string;
	subText: string;
	subTextLink: string;

	image: string = '';

	constructor(private store: Store<AppState>, private uploadService: FileUploaderService) { }

	ngOnInit(): void {
		this.image = this.partner.image;
		this.mainText = this.partner.mainText;
		this.subText = this.partner.subText;
		this.subTextLink = this.partner.subTextLink;
	}

	handleModal(value: boolean) {
		this.open = value;
	}

	handleFileDrop(file: File) {
		this.file = file;
		this.uploadService.uploadImage(file).subscribe(url => {
			this.image = url;
		});
	}

	removeImage() {
		this.image = '';
	}

	cancel() {
		this.image = this.partner.image;
		this.mainText = this.partner.mainText;
		this.subText = this.partner.subText;
		this.subTextLink = this.subTextLink;
		this.handleModal(false);
	}

	detele() {
		this.store.dispatch(deletePartner({ id: this.partner.id }));
	}

	submit() {
		this.store.dispatch(updatePartner({
			partner: {
				id: this.partner.id,
				subText: this.subText,
				subTextLink: this.subTextLink,
				mainText: this.mainText,
				image: this.image,
			}
		}))

		this.handleModal(false);
	}
}
