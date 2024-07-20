import { Route, Routes } from '@angular/router';

import { CreateDiscountComponent } from '../components/administration-components/create-discount/create-discount.component';
import { DashboardComponent } from '../components/administration-components/dashboard/dashboard.component';
import { DiscountsComponent } from '../components/administration-components/discounts/discounts.component';
import { MainDiscountsComponent } from '../components/administration-components/main-discounts/main-discounts.component';
import { SettingsComponent } from '../components/administration-components/settings/settings.component';
import { UpdateDiscountComponent } from '../components/administration-components/update-discount/update-discount.component';
import { UsersManagerPanelComponent } from '../components/administration-components/users-manager-panel/users-manager-panel.component';
import { MainComponent } from '../components/administration-components/users/main/main.component';
import { UserCardComponent } from '../components/administration-components/users/user-card/user-card.component';
import { UsersComponent } from '../components/administration-components/users/users.component';
import { AdvantagesComponent } from '../components/moderation-components/advantages/advantages.component';
import { EventUpdateComponent } from '../components/moderation-components/event-update/event-update.component';
import { EventsComponent } from '../components/moderation-components/events/events.component';
import { PartnersComponent } from '../components/moderation-components/partners/partners.component';
import { QuestionsComponent } from '../components/moderation-components/questions/questions.component';
import { AdminGuardService } from '../guards/admin-guard.service';
import { AuthGuardService } from '../guards/auth-guard.service';
import { ModeratorGuardService } from '../guards/moderator-guard.service';
import { AdministratorPageComponent } from './administrator-page/administrator-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ModerationPageComponent } from './moderation/moderation-page.component';

export const administrationsRoutes: Routes = [
	{
		component: DashboardComponent,
		path: 'dashboard',
	},
	{
		component: UsersComponent,
		path: 'users',
		children: [
			{ path: ':userId', component: UserCardComponent },
			{ path: '', component: MainComponent },
		],
	},
	{
		component: SettingsComponent,
		path: 'settings',
	},
	{
		component: DiscountsComponent,
		path: 'discounts',
		children: [
			{ path: '', component: MainDiscountsComponent },
			{ path: 'create', component: CreateDiscountComponent },
			{ path: ':id', component: CreateDiscountComponent },
		],
	},
	{
		component: UsersManagerPanelComponent,
		path: 'users-manager-panel',
	},
];

export const moderationsRoutes: Routes = [
	{
		component: EventsComponent,
		path: 'events',
	},
	{
		component: AdvantagesComponent,
		path: 'advantages',
	},
	{
		component: QuestionsComponent,
		path: 'questions',
	},
	{
		component: PartnersComponent,
		path: 'partners',
	},
	{
		component: EventUpdateComponent,
		path: 'events/:id',
	},
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
		canActivate: [AuthGuardService, ModeratorGuardService],
		children: moderationsRoutes,
	},
	{
		path: 'administration',
		component: AdministratorPageComponent,
		canActivate: [AuthGuardService, AdminGuardService],
		children: administrationsRoutes,
	},
	{
		path: '**',
		redirectTo: '',
	},
];
