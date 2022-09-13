import { Component, Input, OnInit } from '@angular/core';
import { Requisicao } from '../../models/requisicao.model';

@Component({
  selector: 'app-requisicoes-detalhes',
  templateUrl: './requisicoes-detalhes.component.html',
})
export class RequisicoesDetalhesComponent {

  @Input() requisicao:Requisicao;
}
