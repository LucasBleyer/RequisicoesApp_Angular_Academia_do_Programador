import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RequisicaoComponent } from './requisicao.component';
import { RequisicoesDepartamentoComponent } from './requisicoes-departamento/requisicoes-departamento.component';
import { RequisicoesFuncionarioComponent } from './requisicoes-funcionario/requisicoes-funcionario.component';
import { RequisicaoResolver } from './services/requisicao.resolver';

const routes: Routes = [
  {
    path: "",
    component: RequisicaoComponent,
    children: [
      { path: "", redirectTo: "funcionario", pathMatch: "full" },
      { path: "funcionario", component: RequisicoesFuncionarioComponent },
      { path: "departamento", component: RequisicoesDepartamentoComponent }
    ]
  },
  {
    path: ":id", component: DetalhesComponent,
    resolve: { requisicao: RequisicaoResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisicaoRoutingModule { }
