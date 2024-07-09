import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recuperar-conta',
  templateUrl: './recuperar-conta.component.html',
  styleUrl: './recuperar-conta.component.css'
})
export class RecuperarContaComponent {

  recuperarForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService
  ) {
    this.recuperarForm = this.fb.group({
    usuario: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.spinner.show();
    this.authService.recoverPassword(this.recuperarForm.value.usuario).subscribe({
      next: () => {
        this.snackBar.open("Verifique seu email", "OK", {
          duration: 5000
        }),
        this.spinner.hide();
        this.router.navigate(['login']);
      },
      error: error => {
        this.spinner.hide();
        this.snackBar.open("Falha ao recuperar senha", "OK", {
          duration: 5000
        })
      }
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.recuperarForm.controls[controlName].hasError(errorName);
  }

  sair() {
    this.router.navigate(['login']);
  }


}
