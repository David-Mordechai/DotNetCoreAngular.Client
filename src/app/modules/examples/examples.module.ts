import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { MaterialTableComponent } from './material-table/material-table.component';
import { MaterialFormComponent } from './material-form/material-form.component';
import { AngularMaterialModule } from '../angular-material.module';
import { TreeComponent } from './tree/tree-component';

@NgModule({
  declarations: [
    BasicTableComponent,
    MaterialTableComponent,
    MaterialFormComponent,
    TreeComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    BasicTableComponent,
    MaterialTableComponent,
    MaterialFormComponent
  ]
})
export class ExamplesModule { }
