import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/models/Question';
import AppState from 'src/app/store';
import { Store } from '@ngrx/store';
import {
	deleteQuestion,
	updateQuestion,
} from 'src/app/store/actions/questions.action';
import { NgIf } from '@angular/common';
import { IconButtonComponent } from '../../ui/icon-button/icon-button.component';
import { TextFieldComponent } from '../../ui/text-field/text-field.component';
import { EditorComponent } from '../../ui/editor/editor.component';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    imports: [NgIf, IconButtonComponent, TextFieldComponent, EditorComponent]
})
export class QuestionComponent implements OnInit {
	questionText: string;
	answer: string;
	@Input() question: Question;
	isEdit: boolean = false;

	constructor(private store: Store<AppState>) { }

	ngOnInit(): void {
		this.answer = this.question.answer;
		this.questionText = this.question.questionText;
	}

	changeMode() {
		this.isEdit = !this.isEdit;
	}

	save() {
		this.store.dispatch(
			updateQuestion({
				question: {
					...this.question,
					questionText: this.questionText,
					answer: this.answer,
				},
			}),
		);
		this.changeMode();
	}

	delete() {
		this.store.dispatch(deleteQuestion({ id: this.question.id }));
	}
}
