import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent implements OnInit{

  usuario!: Usuario
  addUsuarioForm!: FormGroup;
  hide: boolean = true;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {

    this.addUsuarioForm = this.formBuilder.group({
      FirebaseId: ['',],
      Nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Cargo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.addUsuarioForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.spinner.show();
    this.usuario = this.addUsuarioForm.value;
    console.log(this.usuario);
    this.usuarioService.addUsuario(this.usuario).then(res => {
      this.spinner.hide();
      this.router.navigate(['/componentes/home/listar-usuarios']);
    },
    err => {
      this.spinner.hide();
      this.snackBar.open("Erro ao adicionar usuario", "OK", {
        duration: 5000
      })
  })

  }


}
