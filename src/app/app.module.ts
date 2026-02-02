import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CoreModule } from './modules/core/core.module';
import { CoursesModule } from './modules/courses/courses.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffectsEffects } from './store/courses/effects/courses-effects.effects';
import { AuthEffectsEffects } from './store/auth/effects/auth-effects.effects';
import { AuthorsEffectsEffects } from './store/authors/effects/authors-effects.effects';

registerLocaleData(localeRu);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    CoursesModule,
    BrowserAnimationsModule,
    LoginModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 25 })
      : [],
    EffectsModule.forRoot([CoursesEffectsEffects, AuthEffectsEffects, AuthorsEffectsEffects]),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
