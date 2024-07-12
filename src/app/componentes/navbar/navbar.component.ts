import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  email: string | null = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/componentes/home/todo']);
      this.email = localStorage.getItem('user')
  }

  sair() {
    this.router.navigate(['login']);
  }

  trocarSenha() {
    this.router.navigate(['recuperarConta']);
  }

}
