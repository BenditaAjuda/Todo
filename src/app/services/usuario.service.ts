import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private angularFirestore: AngularFirestore) { }

  getAllUsuarios() {
    return this.angularFirestore.collection('Usuarios', usuario => usuario.orderBy('Nome'))
      .valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

  getUsuarioById(id: string) {
    return this.angularFirestore.collection('Usuarios').doc(id).valueChanges() as Observable<Usuario>;
  }

  upDateUsuario(usuarioId: string, usuario: Usuario) {
    return this.angularFirestore.collection('Usuarios').doc(usuarioId).update(usuario);
  }

  deleteUsuario(usuarioId: string) {
    return this.angularFirestore.collection('Usuarios').doc(usuarioId).delete();
  }

}
