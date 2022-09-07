import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Departamento } from 'src/app/departamentos/models/departamento.models';
import { Equipamento } from 'src/app/equipamentos/models/equipamento.models';
import { Requisicao } from '../models/requisicao.model';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService {

  private registros: AngularFirestoreCollection<Requisicao>;

  constructor(private firestore: AngularFirestore)
  { this.registros = this.firestore.collection<Requisicao>("requisicoes"); }

  public selecionarTodos(): Observable<Requisicao[]> {
    return this.registros.valueChanges()
    .pipe(
        map((requisicoes: Requisicao[]) => {
          requisicoes.forEach(requisicao => {

            this.firestore
            .collection<Departamento>("departamentos")
            .doc(requisicao.departamentoId)
            .valueChanges()
            .subscribe(x => requisicao.departamento = x
              )

            if(requisicao.equipamentoId){
            this.firestore
            .collection<Equipamento>("equipamentos")
            .doc(requisicao.equipamentoId)
            .valueChanges()
            .subscribe(x => requisicao.equipamento = x
              )
            }
          });
          return requisicoes;
        })
      )
    }

  public async inserir(registro: Requisicao): Promise<any> {
    if(!registro)
      return Promise.reject("item inválido");

    const res = await this.registros.add(registro);

    registro.id = res.id;

    this.registros.doc(res.id).set(registro);

 }

 public async editar(registro: Requisicao): Promise<void> {
  return this.registros.doc(registro.id).set(registro);
}

public excluir(registro: Requisicao): Promise<void> {
  return this.registros.doc(registro.id).delete();

 }

}
