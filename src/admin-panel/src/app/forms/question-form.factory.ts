import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from '../models/Question';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuestionFormFactory {
    constructor(private fb: FormBuilder) {}

    createForm(question?: Question): FormGroup {
        return this.fb.group({
            questionText: [question?.questionText ?? '', [Validators.required]],
            answer: [question?.answer ?? '', [Validators.required, Validators.minLength(10)]],
        });
    }
}
