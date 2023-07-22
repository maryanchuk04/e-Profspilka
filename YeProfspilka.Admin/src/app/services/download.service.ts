import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DownloadService {
    private downloadLink = document.createElement('a');
    private defaultRegex = /(?<=filename=)(.*)(?=; filename)/; // find everything after 'filename=' and before '; filename'
    private utf8regex = /(?<=filename\*=UTF-8'')(.*)/; // find everything after 'filename\*=UTF-8'''

    constructor() {}

    getDownload(res: HttpResponse<Blob>) {
        let fileName = decodeURIComponent(this.getContentDispositionFromResponse(res, this.utf8regex));
        // Some old browsers may not allow utf-8 encoding, so just in case, we'll try one more time without it
        if (!fileName) {
            fileName = this.getContentDispositionFromResponse(res, this.defaultRegex)?.replace(/['"]/g, '');
        }
        if (fileName) {
            const binaryData = [];
            binaryData.push(res.body);
            this.downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
            this.downloadLink.setAttribute('download', fileName);
            this.downloadLink.click();
        }
    }

    getDownloadFromPath(filePath: string) {
        if (filePath) {
            this.downloadLink.href = filePath;
            const fileName = filePath.replace(/^.*[\\\/]/, '');
            this.downloadLink.setAttribute('download', fileName);
            this.downloadLink.click();
        }
    }

    private getContentDispositionFromResponse(response: HttpResponse<Blob>, regex: RegExp): string {
        return response.headers.get('Content-Disposition').match(regex)?.[0];
    }
}
