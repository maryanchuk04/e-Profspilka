import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { RestService } from './app/services/rest.service';
import { DownloadService } from './app/services/download.service';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './app/interceptors/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxEditorModule } from 'ngx-editor';
import { options } from './app/utils/editorOptions';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app/app.component';
import reducers from './app/store/reducers';
import effects from './app/store/effects';
import { eProfspilkaPreset } from './app/theme/preset';
import { CookieService } from 'ngx-cookie-service';
import { QuestionFormFactory } from './app/forms/question-form.factory';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            AppRoutingModule,
            SocialLoginModule,
            FormsModule,
            StoreModule.forRoot(reducers),
            EffectsModule.forRoot(effects),
            StoreDevtoolsModule.instrument({
                maxAge: 25,
                logOnly: environment.production,
                autoPause: true,
                connectInZone: true,
            }),
            NgxEditorModule.forRoot(options),
            CKEditorModule,
            ReactiveFormsModule,
            FormsModule, // required animations module
            ToastrModule.forRoot(),
            NgxPaginationModule,
            ButtonModule
        ),
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
        CookieService,
        RestService,
        DownloadService,
        QuestionFormFactory,
        provideHttpClient(withInterceptorsFromDi(), withInterceptors([httpInterceptor])),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: eProfspilkaPreset,
                options: {
                    darkModeSelector: false || 'none',
                },

            },
            ripple: true,
        }),
        provideAnimations(),
    ],
}).catch((err) => console.error(err));
