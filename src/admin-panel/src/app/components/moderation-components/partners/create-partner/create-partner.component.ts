import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { Partner } from 'src/app/models/Partners';
import { PartnersService } from 'src/app/services/partners.service';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-partner',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        FileUploadModule,
        TextareaModule,
        RadioButtonModule,
    ],
    templateUrl: './create-partner.component.html',
})
export class CreatePartnerComponent {
    partnerForm: FormGroup;
    imageBase64: string = '';
    imageHintMessage: string = '';

    constructor(private fb: FormBuilder, private http: HttpClient, private partnerService: PartnersService, private toastr: ToastrService) {
        this.partnerForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            webSiteUrl: [''],
            image: [''],
            imageUrl: [''],
            imageType: ['upload'],
        });
    }

    onImageUpload(event: any): void {
        const file = event.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imageSrc = reader.result as string;
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                const isRatio16by9 = Math.abs(aspectRatio - 16 / 9) < 0.05;

                if (!isRatio16by9 || img.height !== 128) {
                    this.imageHintMessage =
                        '⚠️ Зображення не відповідає рекомендованим розмірам: 16:9, висота — 128px.';
                } else {
                    this.imageHintMessage = '✅ Зображення відповідає рекомендованим параметрам.';
                }

                this.imageBase64 = imageSrc;
                this.partnerForm.patchValue({ image: this.imageBase64 });
            };
            img.src = imageSrc;
        };
        reader.readAsDataURL(file);
    }

    onSubmit(): void {
        if (this.partnerForm.valid) {
            const formValue = this.partnerForm.value;

            const payload = {
                name: formValue.name,
                description: formValue.description,
                webSiteUrl: formValue.webSiteUrl,
                image: this.imageSourceType === 'url'
                    ? formValue.imageUrl
                    : this.imageBase64,
            } as Partner;

            this.partnerService.create(payload).subscribe({
                next: (res) => {
                    this.toastr.success('Партнера успішно створено!');
                    this.partnerForm.reset({
                        imageType: 'upload',
                    });
                    this.imageBase64 = '';
                    this.imageHintMessage = '';
                },
                error: (err) => {
                    console.error('❌ Error creating partner:', err);
                }
            });
        }
    }

    get imageSourceType(): 'upload' | 'url' {
        return this.partnerForm.get('imageType')?.value;
    }
}
