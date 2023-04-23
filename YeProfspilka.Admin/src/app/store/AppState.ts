import { AdvantagesState } from './reducers/advantage.reducer';
import { AlertState } from './reducers/alert.reducer';
import { EventsState } from './reducers/events.reducer';
import { PartnersState } from './reducers/partners.reducer';
import { QuestionState } from './reducers/question.reducer';
import { UserState } from './reducers/user.reducer';

export interface AppState {
	user: UserState;
	alert: AlertState;
	question: QuestionState;
	partners: PartnersState;
	advantages: AdvantagesState;
	events: EventsState
}
