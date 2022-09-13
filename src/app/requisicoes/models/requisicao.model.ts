import { Departamento } from "src/app/departamentos/models/departamento.models";
import { Equipamento } from "src/app/equipamentos/models/equipamento.models";
import { Funcionario } from "src/app/funcionarios/models/funcionario.model";

export class Requisicao {
  id: string;
  descricao: string;
  dataAbertura: Date | any;

  funcionarioId: string;
  funcionario?: Funcionario;

  departamentoId: string;
  departamento?: Departamento;

  equipamentoId?: string;
  equipamento?: Equipamento;
}
