import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const editorConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'link',
			'|',
			'bulletedList',
			'numberedList',
			'todoList',
			'|',
			'alignment',
			'indent',
			'outdent',
			'|',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'|',
			'undo',
			'redo',
		],
	},
	language: 'en',
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
	},
	mediaEmbed: {
		previewsInData: true,
	},
	licenseKey: '',
};
