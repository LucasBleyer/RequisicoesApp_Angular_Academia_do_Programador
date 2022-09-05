import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DepartamentoService } from '../departamentos/services/departamento.service';
import { Funcionario } from './models/funcionario.model';
import { FuncionarioService } from './services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html'
})
export class FuncionarioComponent implements OnInit {

  public funcionarios$: Observable<Funcionario[]>;
  public form: FormGroup;

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(""),
      nome: new FormControl(""),
      email: new FormControl(""),
      funcao: new FormControl(""),
      departamentoId: new FormControl(""),
      departamento: new FormControl(""),
    })
  }

  get tituloModal():string {
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id(): AbstractControl | null{
    return this.form.get("id");
  }

  public async cadastrar(modal: TemplateRef<any>, funcionario?: Funcionario){

    this.form.reset();

    if(funcionario){
      this.form.setValue(funcionario);
    }

    try{
      await this.modalService.open(modal).result;

      if(!funcionario){
        await this.funcionarioService.inserir(this.form.value);
      }
      else{
        await this.funcionarioService.editar(this.form.value);
      }
      this.toastrService.success("O funcionário foi salvo com sucesso!", "Gerenciamento de Funcionários");
    }
    catch(error){
      if(error != "fechar" && error != "0"  && error != "1" )
      this.toastrService.error("Houve um erro ao salvar o funcionário. Tente novamente", "Gerenciamento de Funcionários")
    }
  }

  public async remover(funcionario: Funcionario){

    try{
      await this.funcionarioService.excluir(funcionario);

      this.toastrService.success("O funcionário foi excluido com sucesso!", "Gerenciamento de Funcionários");
    }
    catch(error){
      if(error != "fechar" && error != "0"  && error != "1" )
      this.toastrService.error("Houve um erro ao excluir o funcionário. Tente novamente", "Gerenciamento de Funcionários")
    }
  }

}
