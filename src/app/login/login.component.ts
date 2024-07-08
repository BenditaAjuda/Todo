import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  hide = true;
  isLoggin = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.isLoggin = true;
    if (this.loginForm.valid){
      this.authService.sigIn(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
        error: error => {
          this.isLoggin = false;
          this.snackBar.open("Email ou senha incorretos", "OK", {
            duration: 5000
          })
        }
      })
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}
