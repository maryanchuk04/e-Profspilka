import { Observable } from 'rxjs';
import { Question } from 'src/app/models/Question';
import AppState from 'src/app/store';
import { createQuestion, fetchQuestions } from 'src/app/store/actions/questions.action';
import { selectQuestions, selectQuestionsLoading } from 'src/app/store/selectors/question.selector';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgIf, NgFor, AsyncPipe, NgClass } from '@angular/common';
import { LoaderComponent } from '../../loader/loader.component';
import { ModerationHeaderComponent } from '../../../shared/moderation-header/moderation-header.component';
import { QuestionComponent } from '../../question/question.component';
import { DialogModule } from 'primeng/dialog';
import { EditorComponent } from '../../../ui/editor/editor.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { QuestionFormFactory } from 'src/app/forms/question-form.factory';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    imports: [
        NgIf,
        LoaderComponent,
        ModerationHeaderComponent,
        NgFor,
        QuestionComponent,
        DialogModule,
        EditorComponent,
        AsyncPipe,
        NgClass,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
    ],
})
export class QuestionsComponent implements OnInit {
    questionForm: FormGroup;

    loading$: Observable<boolean>;
    questions$: Observable<Question[]>;
    search: string;
    modal: boolean = false;

    constructor(private store: Store<AppState>, private questionFormFactory: QuestionFormFactory) {
        this.questionForm = this.questionFormFactory.createForm();
    }

    ngOnInit(): void {
        this.store.dispatch(fetchQuestions());
        this.loading$ = this.store.select(selectQuestionsLoading);
        this.questions$ = this.store.select(selectQuestions);
    }

    handleOpenModal() {
        this.modal = true;
        this.questionForm.reset();
    }

    handleCloseModal = () => this.modal = false;

    create() {
        if (this.questionForm.invalid) return;

        this.store.dispatch(
            createQuestion({
                question: {
                    questionText: this.questionForm.value.questionText,
                    answer: this.questionForm.value.answer,
                } as Question,
            })
        );

        this.handleCloseModal();
    }
}
