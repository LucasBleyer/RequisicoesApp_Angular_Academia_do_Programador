import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento.models';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private registros: AngularFirestoreCollection<Departamento>;

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Departamento>("departamentos");
  }

  public selecionarTodos(): Observable<Departamento[]> {
    return this.registros.valueChanges();
  }

  public async inserir(registro: Departamento): Promise<any>{
    if(!registro)
      return Promise.reject("item inválido");

    const resposta = await this.registros.add(registro);
    registro.id = resposta.id;
    this.registros.doc(resposta.id).set(registro);
  }

  public async editar(registro: Departamento): Promise<void>{
    return this.registros.doc(registro.id).set(registro);
  }
}
