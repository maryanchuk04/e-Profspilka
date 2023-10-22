import { Editor, Toolbar } from 'ngx-editor';

import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Optional,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {
	@Input() value: string = '';
	@Input() placeholder: string = '';
	@Input() mode: 'simple' | 'default' = 'default';
	@Input() controlName: string | null = null;

	@Output() valueChange = new EventEmitter<string>();

	editor: Editor;
	isDefaultToolbar = true;
	form: FormGroup = null;

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

	simpleToolbar: Toolbar = [
		['bold', 'italic'],
		['underline', 'strike'],
		['ordered_list', 'bullet_list'],
		[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
		['link', 'image'],
		['text_color', 'background_color'],
	];

	constructor(@Optional() private rootForm: FormGroupDirective) {}

	ngOnInit(): void {
		if (this.controlName !== null) {
			this.form = this.rootForm?.control;
		}

		if (this.mode === 'simple') {
			this.isDefaultToolbar = false;
		}
		this.editor = new Editor();
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}
}
