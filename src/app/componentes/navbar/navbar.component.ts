import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { DadosUsuario } from '../../model/dados-usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  dadosUsuario?: DadosUsuario;

  constructor(private router: Router,
              private shared: SharedService
  ) {}

  ngOnInit(): void {
    this.recebeDados();
  }

  sair() {
    this.router.navigate(['login']);
  }

  trocarSenha() {
    this.router.navigate(['recuperarConta']);
  }

  private recebeDados(){
    this.shared.receberDadosUsuario().subscribe({
      next: (data: DadosUsuario) => {
        if(!data){
          //this.router.navigate(['/']);
        }
        else{
          console.log("Dados1: ", data);
          this.dadosUsuario = data;
        }
      }
    })
  }

}
