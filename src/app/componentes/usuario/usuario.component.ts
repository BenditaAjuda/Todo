import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['Nome', 'Email', 'Cargo', 'star'];
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService,
              private spinner: NgxSpinnerService,
              private router: Router) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buscarUsuarios();
    this.dataSource.sort = this.sort;
  }

  public buscarUsuarios(): void{
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarioRecebido: Usuario[]) => {
        this.usuarios = usuarioRecebido;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.dataSource.paginator = this.paginator;
        console.log("Aqui: ", this.usuarios);
        this.spinner.hide();
      },
      error: (error: any) => {
        console.log("Erro: ", error.error);
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
