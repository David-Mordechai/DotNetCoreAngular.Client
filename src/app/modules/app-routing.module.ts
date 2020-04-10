import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicTableComponent } from './examples/basic-table/basic-table.component';
import { MaterialTableComponent } from './examples/material-table/material-table.component';
import { MaterialFormComponent } from './examples/material-form/material-form.component';
import { LoginComponent } from './login/components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { RandomGuard } from './login/auth/random.guard';
import { AuthGuard } from './login/auth/auth.guard';
import { RegisterComponent } from './login/components/register/register.component';
import { TreeComponent } from './examples/tree/tree-component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [RandomGuard]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [RandomGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [AuthGuard]
  },
  {
    path: 'basictable', component: BasicTableComponent, canActivate: [RandomGuard]
  },
  {
    path: 'materialtable', component: MaterialTableComponent, canActivate: [RandomGuard]
  },
  {
    path: 'materialform', component: MaterialFormComponent, canActivate: [RandomGuard]
  },
  {
    path: 'materialtree', component: TreeComponent, canActivate: [RandomGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
