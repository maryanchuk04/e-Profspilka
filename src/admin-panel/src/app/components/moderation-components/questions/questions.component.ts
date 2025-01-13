import { Observable } from 'rxjs';
import { Question } from 'src/app/models/Question';
import AppState from 'src/app/store';
import { createQuestion, fetchQuestions } from 'src/app/store/actions/questions.action';
import { selectQuestions, selectQuestionsLoading } from 'src/app/store/selectors/question.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { ModerationHeaderComponent } from '../../../shared/moderation-header/moderation-header.component';
import { QuestionComponent } from '../../question/question.component';
import { ModalComponent } from '../../modal/modal.component';
import { TextFieldComponent } from '../../../ui/text-field/text-field.component';
import { EditorComponent } from '../../../ui/editor/editor.component';
import { ButtonComponent } from '../../../ui/button/button.component';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    imports: [NgIf, LoaderComponent, ModerationHeaderComponent, NgFor, QuestionComponent, ModalComponent, TextFieldComponent, EditorComponent, ButtonComponent, AsyncPipe]
})
export class QuestionsComponent implements OnInit {
	question: string;
	answer: string = '';
	loading$: Observable<boolean>;
	questions$: Observable<Question[]>;
	search: string;
	modal: boolean = false;

	constructor(private store: Store<AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(fetchQuestions());
		this.loading$ = this.store.select(selectQuestionsLoading);
		this.questions$ = this.store.select(selectQuestions);
	}

	handleChange(value: string) {
		// TODO add search handler
	}

	handleOpenModal() {
		this.modal = true;
	}

	handleCloseModal() {
		this.modal = false;
	}

	create() {
		this.store.dispatch(
			createQuestion({
				question: {
					questionText: this.question,
					answer: this.answer,
					id: '',
				},
			})
		);
		this.handleCloseModal();
		this.question = '';
		this.answer = '';
	}
}
