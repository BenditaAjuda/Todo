import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Usuario } from '../../../model/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModalService } from '../../../services/modal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  idUsuario: string = "";
  nomeDelete: string = "";
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['firebaseId', 'Nome', 'Email', 'Cargo', 'star'];
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService,
              private spinner: NgxSpinnerService,
              private modalService: ModalService,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
    this.spinner.show();
    this.buscarUsuarios();
    this.dataSource.sort = this.sort;
  }

  async confirmDelete(): Promise<void> {
    const itemName = this.idUsuario;
    const nomeDelete = this.nomeDelete;
    const confirmed = await this.modalService.openDeleteModal(nomeDelete);

    if (confirmed) {
     this.spinner.show();
     this.usuarioService.deleteUsuario(itemName)
     .then((data: any) => {
      this.snackBar.open("Deletado com sucesso", "OK", {
        duration: 5000
      })
      this.spinner.hide();
    },
    error => {
      this.snackBar.open("Erro ao deletar", "OK", {
        duration: 5000
      })
      this.spinner.hide();
    })

    } else {
      console.log('Delete canceled');
    }
  }

  updateShow(modo: string) {
    this.router.navigate(['/componentes/home/update-usuario', this.idUsuario, modo]);
  }

  public buscarUsuarios(): void{
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarioRecebido: Usuario[]) => {
        this.usuarios = usuarioRecebido;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.spinner.hide();
      },
      error: (error: any) => {
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

  pegarId(id: string, nome: string) {
    this.idUsuario = id;
    this.nomeDelete = nome;
  }

}
