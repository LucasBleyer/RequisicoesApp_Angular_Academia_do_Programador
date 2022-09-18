import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { dataFuturaValidador } from '../shared/validators/data-futura-validador';
import { Equipamento } from './models/equipamento.models';
import { EquipamentoService } from './service/equipamento.service';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html'
})
export class EquipamentoComponent implements OnInit {

  public equipamentos$: Observable<Equipamento[]>;
  public form: FormGroup;

  constructor(
    private equipamentoService: EquipamentoService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.equipamentos$ = this.equipamentoService.selecionarTodos();

    this.form = this.fb.group({
      id: new FormControl(""),
      numeroSerie: new FormControl("", [Validators.required, Validators.minLength(3)]),
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      preco: new FormControl("", [Validators.required]),
      dataFabricacao: new FormControl("", [Validators.required, dataFuturaValidador()])
    })
  }

  get tituloModal():string {
    return this.id?.value ? "Atualização" : "Cadastro";
  }

  get id(): AbstractControl | null{
    return this.form.get("id");
  }

  get numeroSerie(): AbstractControl | null{
    return this.form.get("numeroSerie");
  }

  get nome(): AbstractControl | null{
    return this.form.get("nome");
  }

  get preco(): AbstractControl | null{
    return this.form.get("preco");
  }

  get dataFabricacao(): AbstractControl | null{
    return this.form.get("dataFabricacao");
  }

  public async cadastrar(modal: TemplateRef<any>, equipamento?: Equipamento){

    this.form.reset();

    if(equipamento){
      this.form.setValue(equipamento);
    }

    try{
      await this.modalService.open(modal).result;

      if(!equipamento){
        await this.equipamentoService.inserir(this.form.value);
      }
      else{
        await this.equipamentoService.editar(this.form.value);
      }
      this.toastrService.success("O equipamento foi salvo com sucesso!", "Gerenciamento de Equipamentos");
    }
    catch(error){
      if(error != "fechar" && error != "0"  && error != "1" )
      this.toastrService.error("Houve um erro ao salvar o equipamento. Tente novamente", "Gerenciamento de Equipamentos")
    }
  }

  public async remover(equipamento: Equipamento){

    try{
      await this.equipamentoService.excluir(equipamento);

      this.toastrService.success("O equipamento foi excluido com sucesso!", "Gerenciamento de Equipamentos");
    }
    catch(error){
      if(error != "fechar" && error != "0"  && error != "1" )
      this.toastrService.error("Houve um erro ao excluir o equipamento. Tente novamente", "Gerenciamento de Equipamentos")
    }
  }
}
