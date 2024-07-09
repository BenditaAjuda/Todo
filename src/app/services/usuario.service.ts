import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private angularFirestore: AngularFirestore) { }

  getAllUsuarios() {
    return this.angularFirestore.collection('Usuarios', usuario => usuario.orderBy('Nome'))
      .valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

}
