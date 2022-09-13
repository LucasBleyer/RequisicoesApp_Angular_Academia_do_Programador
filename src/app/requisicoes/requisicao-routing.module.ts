import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicoesDepartamentoComponent } from './requisicoes-departamento/requisicoes-departamento.component';
import { RequisicoesFuncionarioComponent } from './requisicoes-funcionario/requisicoes-funcionario.component';

const routes: Routes = [
  {
    path: "",
    component: RequisicaoComponent,
    children: [
      { path: "", redirectTo: "funcionario", pathMatch: "full" },
      { path: "funcionario", component: RequisicoesFuncionarioComponent },
      { path: "departamento", component: RequisicoesDepartamentoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicaoRoutingModule { }
