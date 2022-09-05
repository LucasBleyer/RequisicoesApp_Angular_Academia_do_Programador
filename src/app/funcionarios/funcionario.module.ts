import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FuncionarioComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,

    ReactiveFormsModule
  ]
})
export class FuncionarioModule { }
