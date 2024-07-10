import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Tarefa } from '../model/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

constructor(private firestore: AngularFirestore) { }

addTarefa(tarefa: Tarefa) {
  return this.firestore.collection('Tarefas').add(tarefa);
}

deleteTarefa(tarefaId: string) {
  return this.firestore.collection('Tarefas').doc(tarefaId).delete();
}

async deleteAllDocuments(collectionName: string): Promise<void> {
  const collectionRef = this.firestore.collection(collectionName).ref;
  const snapshot = await collectionRef.get();

  const batch = this.firestore.firestore.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  }

async addArray(collectionName: string, dataArray: any[]): Promise<void> {
  const batch = this.firestore.firestore.batch();
  const collectionRef = this.firestore.collection(collectionName).ref;

  dataArray.forEach(data => {
    const docRef = collectionRef.doc(); // Automatically generate a unique ID
    batch.set(docRef, data);
  });

  await batch.commit();
  }

  getAlTarefas() {
    return this.firestore.collection('Tarefas', tarefa => tarefa.orderBy('descricao'))
      .valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

  getAllTerminadas() {
    return this.firestore.collection('Terminadas', terminadas => terminadas.orderBy('descricao'))
      .valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

  getAllEmAndamento() {
    return this.firestore.collection('EmAndamento', emAndamento => emAndamento.orderBy('descricao'))
      .valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

}
