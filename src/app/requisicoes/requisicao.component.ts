import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Departamento } from '../departamentos/models/departamento.models';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { Equipamento } from '../equipamentos/models/equipamento.models';
import { EquipamentoService } from '../equipamentos/service/equipamento.service';
import { FuncionarioService } from '../funcionarios/services/funcionario.service';
import { Requisicao } from './models/requisicao.model';
import { RequisicaoService } from './service/requisicao.service';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
})
export class RequisicaoComponent implements OnInit {

  public requisicoes$: Observable<Requisicao[]>;
  public departamentos$: Observable<Departamento[]>;
  public equipamentos$: Observable<Equipamento[]>;

  public funcionarioLogadoId: string;
  public form: FormGroup;

  constructor(
    private requisicoesService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private equipamentoService: EquipamentoService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {


    this.form = this.fb.group({
      id: new FormControl(""),
      dataDeAbertura: new FormControl(""),
      departamentoId: new FormControl("",[Validators.required]),
      departamento: new FormControl(""),
      descricao: new FormControl(""),
      equipamentoId: new FormControl("",[Validators.required]),
      equipamento: new FormControl("")
    }
    )
    this.departamentos$ = this.departamentoService.selecionarTodos();
    this.equipamentos$ = this.equipamentoService.selecionarTodos();

  }

  get tituloModal(): string {
    return this.id?.value ? "Atualização" : "Cadastro"
  }

  get id() {
    return this.form.get("id");
  }

  get dataDeAbertura() {
    return this.form.get("dataDeAbertura");
  }

  get departamentoId() {
    return this.form.get("departamentoId");
  }

  get departamento() {
    return this.form.get("departamento");
  }

  get descricao() {
    return this.form.get("descricao");
  }

  get equipamentoId() {
    return this.form.get("equipamentoId");
  }

  get equipamento() {
    return this.form.get("equipamento");
  }


  public async cadastrar(modal: TemplateRef<any>, requisicao?: Requisicao) {
    this.form.reset();

    if(requisicao){
      const departamento = requisicao.departamento ? requisicao.departamento : null;
      const equipamento = requisicao.equipamento ? requisicao.equipamento : null;

      //spread operator
      const requisicaoCompleta = {
        ...requisicao,
        departamento,
        equipamento
      }

      this.form.get("requisicao")?.setValue(requisicaoCompleta);
    }

    try {
      await this.modalService.open(modal).result;

      if(!requisicao)
      {
        await this.requisicoesService.inserir(this.form.value);
        this.toastr.success("A requisição foi inserida com sucesso!" , "Gerenciamento de Requisições");
      }
      else
      {
        await this.requisicoesService.editar(this.form.value);
        this.toastr.success("A requisição foi editada com sucesso!" , "Gerenciamento de Requisições");
      }
    }
    catch (error)
    {
      console.log(error);

      if(error != "fechar" && error != "0" && error != "1")
        this.toastr.error("Houve um erro ao salvar a requisição. Tente novamente." , "Gerenciamento de Requisições")
    }
  }

  public async remover(requisicao: Requisicao) {

    try {
      this.requisicoesService.excluir(requisicao);
      this.toastr.success("A requisição foi excluída com sucesso!" , "Gerenciamento de Requisições");
    }
    catch (error)
    {
      if(error != "fechar" && error != "0" && error != "1")
        this.toastr.error("Houve um erro ao excluir a requisição. Tente novamente.", "Gerenciamento de Requisições")
    }
  }
}
