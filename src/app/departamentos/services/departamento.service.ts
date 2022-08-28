import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento.models';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private registros: AngularFirestoreCollection<Departamento>

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Departamento>("departamentos");
  }

  public selecionarTodos(): Observable<Departamento[]> {
    return this.registros.valueChanges();
  }
}
