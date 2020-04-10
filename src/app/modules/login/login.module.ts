import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    LoginComponent, 
    LoginLayoutComponent, 
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule, 
    AppRoutingModule
  ],
  exports:[
    LoginLayoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
