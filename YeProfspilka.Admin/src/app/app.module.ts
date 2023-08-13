import { NgxEditorModule, } from 'ngx-editor';
import { NgxPaginationModule, } from 'ngx-pagination';
import { ToastrModule, } from 'ngx-toastr';
import { environment, } from 'src/environments/environment';

import {
	GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtHelperService, JwtModule, } from '@auth0/angular-jwt';
import { CKEditorModule, } from '@ckeditor/ckeditor5-angular';
import { EffectsModule, } from '@ngrx/effects';
import { StoreModule, } from '@ngrx/store';
import { StoreDevtoolsModule, } from '@ngrx/store-devtools';

import { AppRoutingModule, } from './app-routing.module';
import { AppComponent, } from './app.component';
import {
	CreateDiscountComponent,
} from './components/administration-components/create-discount/create-discount.component';
import {
	DashboardComponent,
} from './components/administration-components/dashboard/dashboard.component';
import {
	DiscountsComponent,
} from './components/administration-components/discounts/discounts.component';
import {
	ImportReportComponent,
} from './components/administration-components/import-report/import-report.component';
import {
	MainDiscountsComponent,
} from './components/administration-components/main-discounts/main-discounts.component';
import {
	SettingsComponent,
} from './components/administration-components/settings/settings.component';
import {
	UsersManagerPanelComponent,
} from './components/administration-components/users-manager-panel/users-manager-panel.component';
import { MainComponent, } from './components/administration-components/users/main/main.component';
import {
	UserCardComponent,
} from './components/administration-components/users/user-card/user-card.component';
import {
	UsersTableComponent,
} from './components/administration-components/users/users-table/users-table.component';
import { UsersComponent, } from './components/administration-components/users/users.component';
import { AdvantageComponent, } from './components/advantage/advantage.component';
import { AlertComponent, } from './components/alert/alert.component';
import { EventCardComponent, } from './components/event-card/event-card.component';
import { LoaderComponent, } from './components/loader/loader.component';
import { MenuItemComponent, } from './components/menu-item/menu-item.component';
import { ModalComponent, } from './components/modal/modal.component';
import {
	AdvantagesComponent,
} from './components/moderation-components/advantages/advantages.component';
import {
	EventUpdateComponent,
} from './components/moderation-components/event-update/event-update.component';
import { EventsComponent, } from './components/moderation-components/events/events.component';
import {
	ModerationSidebarComponent,
} from './components/moderation-components/moderation-sidebar/moderation-sidebar.component';
import { PartnersComponent, } from './components/moderation-components/partners/partners.component';
import {
	QuestionsComponent,
} from './components/moderation-components/questions/questions.component';
import { PartnerComponent, } from './components/partner/partner.component';
import { QuestionComponent, } from './components/question/question.component';
import { SidebarComponent, } from './components/sidebar/sidebar.component';
import { SidenavComponent, } from './components/sidenav/sidenav.component';
import { DragDropDirective, } from './directives/drag-drop.directive';
import {
	AdministratorPageComponent,
} from './pages/administrator-page/administrator-page.component';
import { LoginPageComponent, } from './pages/login-page/login-page.component';
import { MainPageComponent, } from './pages/main-page/main-page.component';
import { ModerationPageComponent, } from './pages/moderation/moderation-page.component';
import { DownloadService, } from './services/download.service';
import { ErrorInterceptor, } from './services/error-interceptor.service';
import { RestService, } from './services/rest.service';
import { ContainerComponent, } from './shared/container/container.component';
import { HeaderComponent, } from './shared/header/header.component';
import { ModerationHeaderComponent, } from './shared/moderation-header/moderation-header.component';
import { RoleComponent, } from './shared/role/role.component';
import { SvgComponent, } from './shared/svg/svg.component';
import { SpinnerButtonComponent, } from './spinner-button/spinner-button.component';
import effects from './store/effects';
import reducers from './store/reducers';
import { ButtonComponent, } from './ui/button/button.component';
import { DiscountTypeComponent, } from './ui/discount-type/discount-type.component';
import { EditorComponent, } from './ui/editor/editor.component';
import { FeedbackComponent, } from './ui/feedback/feedback.component';
import { FileInputFieldComponent, } from './ui/file-input-field/file-input-field.component';
import { FormTextFieldComponent, } from './ui/form-text-field/form-text-field.component';
import { GoogleButtonComponent, } from './ui/google-button/google-button.component';
import { IconButtonComponent, } from './ui/icon-button/icon-button.component';
import { QuestionTooltipComponent, } from './ui/question-tooltip/question-tooltip.component';
import { SelectComponent, } from './ui/select/select.component';
import { TextFieldComponent, } from './ui/text-field/text-field.component';
import { options, } from './utils/editorOptions';

@NgModule({
	declarations: [
		AppComponent,
		MainPageComponent,
		HeaderComponent,
		LoginPageComponent,
		TextFieldComponent,
		ButtonComponent,
		SvgComponent,
		ModerationPageComponent,
		ModerationSidebarComponent,
		PartnersComponent,
		SidebarComponent,
		AdvantagesComponent,
		QuestionsComponent,
		GoogleButtonComponent,
		AlertComponent,
		IconButtonComponent,
		AdministratorPageComponent,
		EventsComponent,
		EventCardComponent,
		AdvantageComponent,
		QuestionComponent,
		LoaderComponent,
		ModalComponent,
		ContainerComponent,
		ModerationHeaderComponent,
		PartnerComponent,
		DragDropDirective,
		EditorComponent,
		EventUpdateComponent,
		DashboardComponent,
		UsersComponent,
		SettingsComponent,
		UsersTableComponent,
		UserCardComponent,
		DiscountsComponent,
		MenuItemComponent,
		SidenavComponent,
		RoleComponent,
		UsersManagerPanelComponent,
		QuestionTooltipComponent,
		SelectComponent,
		FeedbackComponent,
		FileInputFieldComponent,
		ImportReportComponent,
		CreateDiscountComponent,
		MainDiscountsComponent,
		SpinnerButtonComponent,
		MainComponent,
		FormTextFieldComponent,
		DiscountTypeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SocialLoginModule,
		HttpClientModule,
		JwtModule,
		FormsModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot(effects),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
			autoPause: true,
		}),
		NgxEditorModule.forRoot(options),
		CKEditorModule,
		ReactiveFormsModule,
		FormsModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(),
		NgxPaginationModule,
	],
	providers: [
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(environment.googleId),
					},
				],
				onError: (err) => {
					console.log(err);
				},
			} as SocialAuthServiceConfig,
		},
		RestService,
		DownloadService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
