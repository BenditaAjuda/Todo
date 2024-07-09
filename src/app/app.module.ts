import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { RecuperarContaComponent } from './recuperar-conta/recuperar-conta.component';
import { ModalComponent } from './layout/modal/modal.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RecuperarContaComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    AngularFireAuthModule,
    MatDialogModule,
    AngularFireModule.initializeApp({
        apiKey: "AIzaSyAtil3k57oXK8E0opVmZJK3tfpj_I257HI",
        authDomain: "benditaajuda-9479f.firebaseapp.com",
        projectId: "benditaajuda-9479f",
        storageBucket: "benditaajuda-9479f.appspot.com",
        messagingSenderId: "911219829514",
        appId: "1:911219829514:web:d6d10748d2ecf2ba0868f3",
        measurementId: "G-5WXH6DNSCM"
    }),

  ],
  exports: [
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
