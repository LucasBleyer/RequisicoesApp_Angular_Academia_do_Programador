import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Departamento } from './models/departamento.models';
import { DepartamentoService } from './services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html'
})
export class DepartamentoComponent implements OnInit {

  public departamentos$: Observable<Departamento[]>;
  public form: FormGroup;

  constructor(
    private departamentoService: DepartamentoService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService
    ) { }


  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(""),
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      telefone: new FormControl("", [Validators.required, Validators.maxLength(15)])
    })
  }

  get tituloModal():string {
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id(){
    return this.form.get("id");
  }

  get nome(){
    return this.form.get("nome");
  }

  get telefone(){
    return this.form.get("telefone");
  }

  public async cadastrar(modal: TemplateRef<any>, departamento?: Departamento){

    this.form.reset();

    if(departamento){
      this.form.setValue(departamento);
    }

    try{
      await this.modalService.open(modal).result;

      if(!departamento){
        await this.departamentoService.inserir(this.form.value);
      }
      else{
        await this.departamentoService.editar(this.form.value);
      }
      this.toastrService.success("O departamento foi salvo com sucesso!", "Gerenciamento de Departamentos");
    }
    catch(error){
      console.log(error);
    }
  }

  public async remover(departamento: Departamento){

    try{
      await this.departamentoService.excluir(departamento);

      this.toastrService.success("O departamento foi excluido com sucesso!", "Gerenciamento de Departamentos");
    }
    catch(error){
      if(error != "fechar" && error != "0"  && error != "1" )
      this.toastrService.error("Houve um erro ao excluir o departamento. Tente novamente", "Gerenciamento de Departamentos")
    }
  }

}
