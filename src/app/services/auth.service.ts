import { Injectable } from '@angular/core';
import { SigIn } from '../model/sign-in';
import { from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  sigIn(sigIn: SigIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(sigIn.usuario, sigIn.senha));
  }
}
