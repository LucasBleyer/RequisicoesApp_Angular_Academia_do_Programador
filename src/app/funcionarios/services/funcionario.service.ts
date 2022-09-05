import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Departamento } from 'src/app/departamentos/models/departamento.models';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private registros: AngularFirestoreCollection<Funcionario>;

  constructor(private firestore: AngularFirestore) {
    this.registros = this.firestore.collection<Funcionario>("funcionarios");
  }

  //estou com problema para atualizar a tabela
  public selecionarTodos(): Observable<Funcionario[]>{
    return this.registros.valueChanges()
    .pipe(
      map((funcionarios: Funcionario[]) => {
        funcionarios.forEach(funcionario => {
          this.firestore
            .collection<Departamento>("departamentos")
            .doc(funcionario.departamentoId)
            .valueChanges()
            .subscribe(x => funcionario.departamento = x);
        });
        return funcionarios;
      })
    )
  }

  public async inserir(registro: Funcionario): Promise<any>{
    if(!registro)
      return Promise.reject("item inválido");

    const resposta = await this.registros.add(registro);
    registro.id = resposta.id;
    this.registros.doc(resposta.id).set(registro);
  }

  public async editar(registro: Funcionario): Promise<void>{
    return this.registros.doc(registro.id).set(registro);
  }

  public excluir(registro: Funcionario): Promise<void>{
    return this.registros.doc(registro.id).delete();
  }
}
