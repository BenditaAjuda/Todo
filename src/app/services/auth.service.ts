import { Injectable } from '@angular/core';
import { SigIn } from '../model/sign-in';
import { from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DadosUsuario } from '../model/dados-usuario';
import { SharedService } from './shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dadosUsuario: DadosUsuario = { nome: "", img: "", logado: false, token: "", email: ""}
  loggedIn = false;

  constructor(private auth: AngularFireAuth,
              private shared: SharedService,
              private snackBar: MatSnackBar,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  sigIn(signIn: SigIn) {
    this.spinner.show();
    this.auth.signInWithEmailAndPassword(signIn.usuario, signIn.senha)
      .then( res => {
          this.dadosUsuario.nome = res.user?.displayName!;
          this.dadosUsuario.img = res.user?.photoURL!;
          this.dadosUsuario.logado = true;
          this.dadosUsuario.token = res.user?.uid!;
          this.dadosUsuario.email = res.user?.email!;
          localStorage.setItem('token', res.user?.uid!);
          localStorage.setItem('user', res.user?.email!);
          this.shared.enviarDadosUsuario(this.dadosUsuario);
          this.loggedIn = true;
          this.spinner.hide();
          this.router.navigate(['componentes']);
      },
      err => {
        this.spinner.hide();
        this.snackBar.open("Email ou senha incorretos", "OK", {
          duration: 5000
        })
    })
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email));
  }

  public isLoggedIn() {
    return this.loggedIn;
 }

}


