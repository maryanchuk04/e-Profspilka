import { Route, Routes } from '@angular/router';

import {
    DashboardComponent
} from '../components/administration-components/dashboard/dashboard.component';
import {
    SettingsComponent
} from '../components/administration-components/settings/settings.component';
import { UsersComponent } from '../components/administration-components/users/users.component';
import {
    AdvantagesComponent
} from '../components/moderation-components/advantages/advantages.component';
import {
    EventUpdateComponent
} from '../components/moderation-components/event-update/event-update.component';
import { EventsComponent } from '../components/moderation-components/events/events.component';
import { PartnersComponent } from '../components/moderation-components/partners/partners.component';
import {
    QuestionsComponent
} from '../components/moderation-components/questions/questions.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { AdministratorPageComponent } from './administrator-page/administrator-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModerationPageComponent } from './moderation/moderation-page.component';

export const administrationsRoutes: Routes = [
	{
		component: DashboardComponent,
		path: 'dashboard'
	},
	{
		component: UsersComponent,
		path: 'users',
	},
	{
		component: SettingsComponent,
		path: 'settings'
	}
];

export const moderationsRoutes: Routes = [
	{
		component: EventsComponent,
		path: 'events',
	},
	{
		component: AdvantagesComponent,
		path: 'advantages'
	},
	{
		component: QuestionsComponent,
		path: 'questions'
	},
	{
		component: PartnersComponent,
		path: 'partners',
	},
	{
		component: EventUpdateComponent,
		path: 'events/:id'
	}
];

export const routes: Routes = [
	{
		path: '',
		component: MainPageComponent,
		canActivate: [AuthGuardService],
	},
	{
		path: 'authenticate',
		component: LoginPageComponent,
	},
	{
		path: 'moderation',
		component: ModerationPageComponent,
		canActivate: [AuthGuardService],
		children: moderationsRoutes
	},
	{
		path: 'administration',
		component: AdministratorPageComponent,
		canActivate: [AuthGuardService],
		children: administrationsRoutes
	},
	{
		path: '**',
		redirectTo: '',
	},
];


