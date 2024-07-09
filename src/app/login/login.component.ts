import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DadosUsuario } from '../model/dados-usuario';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

@Injectable({ providedIn: 'root' })

export class LoginComponent {

  loginForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid){
      this.authService.sigIn(this.loginForm.value);
    }
  }

  recuperarSenha() {
   this.router.navigate(['recuperarConta']);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}
