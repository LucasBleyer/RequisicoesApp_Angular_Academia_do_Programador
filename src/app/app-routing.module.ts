import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PainelComponent } from './painel/painel.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path : "login", component: LoginComponent},
  { path : "painel", component: PainelComponent},
  { path : "departamentos",
  loadChildren : () => import("./departamentos/departamento.module")
    .then(m => m.DepartamentoModule)
  },
  { path : "equipamentos",
  loadChildren : () => import("./equipamentos/equipamento.module")
    .then(m => m.EquipamentoModule)
  },
  { path : "funcionarios",
  loadChildren : () => import("./funcionarios/funcionario.module")
    .then(m => m.FuncionarioModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
