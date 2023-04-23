import { Editor, Toolbar } from 'ngx-editor';

import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
	@Input() value: string = "";
	@Input() placeholder: string = "";
	editor: Editor;
	@Output() valueChange = new EventEmitter<string>();

	toolbar: Toolbar = [
		['bold', 'italic'],
		['underline', 'strike'],
		['code', 'blockquote'],
		['ordered_list', 'bullet_list'],
		[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
		['link', 'image'],
		['text_color', 'background_color'],
		['align_left', 'align_center', 'align_right', 'align_justify'],
	];

	ngOnInit(): void {
		this.editor = new Editor();
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}

}


