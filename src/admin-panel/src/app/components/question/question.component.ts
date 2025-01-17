import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/models/Question';
import AppState from 'src/app/store';
import { Store } from '@ngrx/store';
import { deleteQuestion, updateQuestion } from 'src/app/store/actions/questions.action';
import { NgIf } from '@angular/common';
import { EditorComponent } from '../../ui/editor/editor.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    imports: [NgIf, InputTextModule, EditorComponent, IftaLabelModule, ReactiveFormsModule, ButtonModule],
    providers: [FormsModule],
})
export class QuestionComponent implements OnInit {
    questionForm: FormGroup;

    @Input() question: Question;
    isEdit: boolean = false;

    constructor(private store: Store<AppState>, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.questionForm = this.fb.group({
            questionText: [this.question.questionText, [Validators.required]],
            answer: [this.question.answer, [Validators.required]],
        });
    }

    changeMode() {
        this.isEdit = !this.isEdit;
    }

    save() {
        this.store.dispatch(
            updateQuestion({
                question: {
                    ...this.question,
                    questionText: this.questionForm.value?.questionText,
                    answer: this.questionForm.value?.answer,
                },
            })
        );
        this.changeMode();
    }

    delete() {
        this.store.dispatch(deleteQuestion({ id: this.question.id }));
    }
}
