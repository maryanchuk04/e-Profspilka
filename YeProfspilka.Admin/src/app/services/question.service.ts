import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/Question';
import { RestService } from './rest.service';

@Injectable({
	providedIn: 'root',
})
export class QuestionService {
	url = 'question';

	constructor(private service: RestService<Question>) {}

	getAll(): Observable<Question[]> {
		return this.service.getAll(this.url);
	}

	delete(id: string): Observable<any> {
		return this.service.delete(`${this.url}/${id}`);
	}

	create(question: {
		questionText: string;
		answer: string;
	}): Observable<any> {
		return this.service.post(this.url, question);
	}

	update(question: Question): Observable<Question> {
		return this.service.put(this.url, question);
	}
}
