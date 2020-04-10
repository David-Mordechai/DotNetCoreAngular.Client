import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AppComponent } from './components/app/app.component';
import { DateAdapter } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { heMatPaginatorIntl } from './general/he-MatPaginatorIntl';
import { LayoutModule } from './modules/layout/layout.module';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { ExamplesModule } from './modules/examples/examples.module';
import { TokenInterceptor } from './modules/login/auth/token.interceptor';
import { DatePipe } from '@angular/common';
import { DateFormatHe } from './general/date-format-he';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    LoginModule,
    HttpClientModule,
    ExamplesModule
  ],
  providers: [
    DatePipe,
    {provide: DateAdapter, useClass: DateFormatHe},
    {
      provide: MatPaginatorIntl, useClass: heMatPaginatorIntl
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(dateAdapter: DateAdapter<any>) {
    dateAdapter.setLocale("he")
  }
}
