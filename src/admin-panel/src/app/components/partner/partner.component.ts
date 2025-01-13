import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Partner } from 'src/app/models/Partners';
import { FileUploaderService } from 'src/app/services/file-uploader.service';
import AppState from 'src/app/store';
import { deletePartner, updatePartner } from 'src/app/store/actions/partners.action';
import { IconButtonComponent } from '../../ui/icon-button/icon-button.component';
import { NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { TextFieldComponent } from '../../ui/text-field/text-field.component';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
    selector: 'app-partner',
    templateUrl: './partner.component.html',
    imports: [IconButtonComponent, NgIf, ModalComponent, TextFieldComponent, DragDropDirective, ButtonComponent]
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
