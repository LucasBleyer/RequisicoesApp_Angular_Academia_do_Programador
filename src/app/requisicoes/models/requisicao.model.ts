import { Departamento } from "src/app/departamentos/models/departamento.models";
import { Equipamento } from "src/app/equipamentos/models/equipamento.models";

export class Requisicao {
  id: string;
  descricao: string;
  dataAbertura: Date;
  departamentoId: string;
  departamento?: Departamento;
  equipamentoId: string;
  equipamento?: Equipamento;
}
