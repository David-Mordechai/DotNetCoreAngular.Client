import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutSidenavComponent } from './components/layout-sidenav/layout-sidenav.component';
import { HeaderToolbarComponent } from './components/header-toolbar/header-toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [
    LayoutSidenavComponent,
    HeaderToolbarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule,
    LoginModule
  ],
  exports: [
    LayoutSidenavComponent,
    HeaderToolbarComponent,
    SidenavComponent
  ]
})
export class LayoutModule { }
