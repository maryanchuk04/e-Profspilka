import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Question } from 'src/app/models/Question';
import AppState from 'src/app/store';
import { createQuestion, fetchQuestions } from 'src/app/store/actions/questions.action';
import { selectQuestions, selectQuestionsLoading } from 'src/app/store/selectors/question.selector';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
})
export class QuestionsComponent implements OnInit {
    question: string;
    answer: string;
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
