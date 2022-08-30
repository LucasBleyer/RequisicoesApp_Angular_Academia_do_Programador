import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Equipamento } from '../models/equipamento.models';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  private registros: AngularFirestoreCollection<Equipamento>;

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Equipamento>("equipamentos");
  }

  public selecionarTodos(): Observable<Equipamento[]> {
    return this.registros.valueChanges();
  }

  public async inserir(registro: Equipamento): Promise<any>{
    if(!registro)
      return Promise.reject("item inválido");

    const resposta = await this.registros.add(registro);
    registro.id = resposta.id;
    this.registros.doc(resposta.id).set(registro);
  }

  public async editar(registro: Equipamento): Promise<void>{
    return this.registros.doc(registro.id).set(registro);
  }

  public excluir(registro: Equipamento): Promise<void>{
    return this.registros.doc(registro.id).delete();
  }
}
