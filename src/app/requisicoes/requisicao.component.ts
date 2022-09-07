import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Departamento } from '../departamentos/models/departamento.models';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { Equipamento } from '../equipamentos/models/equipamento.models';
import { EquipamentoService } from '../equipamentos/service/equipamento.service';
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

  public form: FormGroup;

  constructor(
    private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private equipamentoService: EquipamentoService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      funcionario: new FormGroup({
        id: new FormControl(""),
        descricao: new FormControl("",[Validators.required, Validators.minLength(3)]),
        dataAbertura: new FormControl("",[Validators.required]),
        departamentoId: new FormControl("",[Validators.required]),
        departamento: new FormControl(""),
        equipamentoId: new FormControl("",[Validators.required]),
        equipamento: new FormControl("")
      })
    })

    this.requisicoes$ = this.requisicaoService.selecionarTodos();
    this.departamentos$ = this.departamentoService.selecionarTodos();
    this.equipamentos$ = this.equipamentoService.selecionarTodos();
  }

  get tituloModal():string {
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id(): AbstractControl | null{
    return this.form.get("requisicao.id");
  }

  get descricao(): AbstractControl | null{
    return this.form.get("requisicao.descricao");
  }

  get dataAbertura(): AbstractControl | null{
    return this.form.get("requisicao.dataAbertura");
  }

  get departamentoId(): AbstractControl | null{
    return this.form.get("requisicao.departamentoId");
  }

  get equipamentoId(): AbstractControl | null{
    return this.form.get("requisicao.equipamentoId");
  }

  public async cadastrar(modal: TemplateRef<any>, requisicao?: Requisicao){

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

    try{
      await this.modalService.open(modal).result;

      if(this.form.dirty && this.form.valid)
      {
        if(!requisicao)
        {
          await this.requisicaoService.inserir(this.form.get("requisicao")?.value);
        }
        else
        {
          await this.requisicaoService.editar(this.form.get("requisicao")?.value);
        }
        this.toastrService.success("A requisição foi salva com sucesso!", "Gerenciamento de Requisições");
      }
      else
      {
        this.toastrService.error("A requisição precisa ser preenchida!", "Gerenciamento de Requisições")
      }
    }
    catch(error){
      if(error != "fechar" && error != "0"  && error != "1" )
      this.toastrService.error("Houve um erro ao salvar a requisição. Tente novamente", "Gerenciamento de Requisições")
    }
  }

  public async remover(requisicao: Requisicao){

    try{
      await this.requisicaoService.excluir(requisicao);

      this.toastrService.success("A requisição foi excluida com sucesso!", "Gerenciamento de Requisições");
    }
    catch(error){
      if(error != "fechar" && error != "0"  && error != "1" )
      this.toastrService.error("Houve um erro ao excluir a requisição. Tente novamente", "Gerenciamento de Requisições")
    }
  }

}
