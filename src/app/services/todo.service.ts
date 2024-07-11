import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, Observable, take } from 'rxjs';
import { Tarefa } from '../model/tarefa';
import { TarefaEmAndamento } from '../model/tarefa-andamento';
import { TarefaFinalizada } from '../model/tarefa-finalizada';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

constructor(private firestore: AngularFirestore) { }

addTarefa(tarefa: Tarefa) {
  return this.firestore.collection('Tarefas').add(tarefa);
}

addTarefaEmAndamento(tarefa: TarefaEmAndamento) {
  return this.firestore.collection('TarefaEmAndamento').add(tarefa);
}

addTarefaFinalizada(tarefa: TarefaFinalizada) {
  return this.firestore.collection('TarefaFinalizada').add(tarefa);
}

deleteTarefa(tarefaId: string) {
  return this.firestore.collection('Tarefas').doc(tarefaId).delete();
}

deleteTarefaEmAndamento(tarefaId: string) {
  return this.firestore.collection('TarefaEmAndamento').doc(tarefaId).delete();
}

getTarefaById(id: string): Observable<Tarefa> {
  return this.firestore
    .collection<Tarefa>('Tarefas')
    .doc<Tarefa>(id)
    .valueChanges()
    .pipe(
      filter((tarefeRecebida): tarefeRecebida is Tarefa => tarefeRecebida !== undefined),
      take(1)
    );
}

getTarefaEmAndamentoById(id: string): Observable<TarefaEmAndamento> {
  return this.firestore
    .collection<TarefaEmAndamento>('TarefaEmAndamento')
    .doc<TarefaEmAndamento>(id)
    .valueChanges()
    .pipe(
      filter((tarefeRecebida): tarefeRecebida is TarefaEmAndamento => tarefeRecebida !== undefined),
      take(1)
    );
}

  getAlTarefas() {
    return this.firestore.collection('Tarefas', tarefa => tarefa.orderBy('DescricaoTarefa'))
      .valueChanges({idField: 'firebaseIdTarefa'}) as Observable<any[]>;
  }

  getAllEmAndamento() {
    return this.firestore.collection('TarefaEmAndamento', emAndamento => emAndamento.orderBy('DescricaoTarefaEmAndamento'))
      .valueChanges({idField: 'firebaseIdTarefaEmAndamento'}) as Observable<any[]>;
  }

  getAllTerminadas() {
    return this.firestore.collection('TarefaFinalizada', terminadas => terminadas.orderBy('DescricaoTarefaFinalizada'))
      .valueChanges({idField: 'firebaseIdTarefaFinalizada'}) as Observable<any[]>;
  }

  // metodos que salvan array de objetos e deletam tables
  // async deleteAllDocuments(collectionName: string): Promise<void> {
  //   const collectionRef = this.firestore.collection(collectionName).ref;
  //   const snapshot = await collectionRef.get();

  //   const batch = this.firestore.firestore.batch();
  //   snapshot.docs.forEach(doc => {
  //     batch.delete(doc.ref);
  //   });

  //   await batch.commit();
  //   }

  // async addArray(collectionName: string, dataArray: any[]): Promise<void> {
  //   const batch = this.firestore.firestore.batch();
  //   const collectionRef = this.firestore.collection(collectionName).ref;

  //   dataArray.forEach(data => {
  //     const docRef = collectionRef.doc(); // Automatically generate a unique ID
  //     batch.set(docRef, data);
  //   });

  //   await batch.commit();
  //   }

}
