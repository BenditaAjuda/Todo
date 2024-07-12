import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../model/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrl: './update-usuario.component.css'
})
export class UpdateUsuarioComponent implements OnInit{

  id: string | null = null;
  modo: string | null = null;
  usuario?: Usuario
  updateUsuarioForm!: FormGroup;
  hide: boolean = true;

  constructor(private route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.modo = this.route.snapshot.paramMap.get('mode');

    this.buscarUsuarioPorId();

    this.updateUsuarioForm = this.formBuilder.group({
      Nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Cargo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    });

  }

  buscarUsuarioPorId() {
    if(this.id != null)
    {
      this.usuarioService.getUsuarioById(this.id).subscribe({
        next: (response: Usuario) => {
          this.updateUsuarioForm.patchValue(response);
          this.usuario = response;
        },
        error: (erro: any) => {
        }
      })
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.updateUsuarioForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.spinner.show();
    this.usuario = this.updateUsuarioForm.value;
    if(this.id != null && this.usuario != null){
      this.usuarioService.upDateUsuario(this.id, this.usuario).then( res => {
        this.spinner.hide();
        this.router.navigate(['/componentes/home/listar-usuarios']);
      },
      err => {
        this.spinner.hide();
        this.snackBar.open("Erro ao atualizar usuário", "OK", {
          duration: 5000
        })
      })
    }
  }

}
