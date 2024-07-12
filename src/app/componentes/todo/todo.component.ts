import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from '../../model/tarefa';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TarefaEmAndamento } from '../../model/tarefa-andamento';
import { TarefaFinalizada } from '../../model/tarefa-finalizada';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  tarefaForm: FormGroup = new FormGroup({});
  usuarios: Usuario[] = [];
  edicaoHabilitada: boolean = false;

  terminadas: Tarefa[] = [];
  updateIndex: any;

  //tarefa
  tarefa!: Tarefa;
  tarefaTransicao!: Tarefa;
  tarefas: Tarefa[] = [];
  idTarefa: string = "";
  displayedColumnsTarefa: string[] = ['firebaseIdTarefa', 'DescricaoTarefa', 'UsuarioTarefa', 'opcoes'];
  dataSourceTarefa = new MatTableDataSource<Tarefa>(this.tarefas);
  @ViewChild('paginator1') paginatorTarefa!: MatPaginator;
  @ViewChild(MatSort) sortTarefa!: MatSort;

  tarefaTransicao2!: TarefaEmAndamento;
  idTarefaEmAndamento: string = "";
  tarefaEmAndamento!: TarefaEmAndamento;
  tarefasEmAndamento: TarefaEmAndamento[] = [];
  displayedColumnsTarefaEmAndamento: string[] = ['firebaseIdTarefaEmAndamento', 'DescricaoTarefaEmAndamento', 'UsuarioTarefaEmAndamento', 'opcoes'];
  dataSourceTarefaEmAndamento = new MatTableDataSource<TarefaEmAndamento>(this.tarefasEmAndamento);
  @ViewChild('paginator2') paginatorTarefaEmAndamento!: MatPaginator;
  @ViewChild(MatSort) sortTarefaEmAndamento!: MatSort;

  tarefaFinalizada!: TarefaFinalizada;
  tarefasFinalizadas: TarefaFinalizada[] = [];
  displayedColumnsTarefaFinalizada: string[] = ['firebaseIdTarefaFinalizada', 'DescricaoTarefaFinalizada', 'UsuarioTarefaFinalizada', 'opcoes'];
  dataSourceTarefaFinalizada = new MatTableDataSource<TarefaFinalizada>(this.tarefasFinalizadas);
  @ViewChild('paginator3') paginatorTarefaFinalizada!: MatPaginator;
  @ViewChild(MatSort) sortTarefaFinalizada!: MatSort;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private spinner: NgxSpinnerService,
              private todoService: TodoService,
              private snackBar: MatSnackBar,
              private modalService: ModalService,
              private router: Router) {}

    applyFilterTarefa(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTarefa.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.spinner.show();

    this.inicializarTarefaForm();
    this.buscarTarefas();
    this.buscarUsuarios();

    this.buscarTarefasEmAndamento();

    this.buscarTarefasFinalizadas();
  }

  inicializarTarefaForm() {
    this.tarefaForm = this.formBuilder.group({
      DescricaoTarefa: ['', Validators.required],
      UsuarioTarefa: [''],
        })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.tarefaForm.controls[controlName].hasError(errorName);
  }

  public buscarTarefas(): void{
    this.todoService.getAlTarefas().subscribe({
      next: (tarefaRecebido: Tarefa[]) => {
        this.tarefas = tarefaRecebido;
        this.dataSourceTarefa = new MatTableDataSource<Tarefa>(this.tarefas);
        this.dataSourceTarefa.paginator = this.paginatorTarefa;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
        this.snackBar.open("Erro buscar tarefa", "OK", {
          duration: 5000
        })
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  adicionarTarefa() {
    this.spinner.show();
    this.tarefa = this.tarefaForm.value;
    this.todoService.addTarefa(this.tarefa).then(res => {
      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.snackBar.open("Erro ao adicionar tarefa", "OK", {
        duration: 5000
      })
    })
    this.tarefaForm.reset();
  }

  pegarIdTarefa(id: string) {
    this.idTarefa = id;
  }

  public buscarUsuarios(): void{
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarioRecebido: Usuario[]) => {
        this.usuarios = usuarioRecebido;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
        this.snackBar.open("Erro ao buscar usuarios", "OK", {
          duration: 5000
        })
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  applyFilterTarefaEmAndamento(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTarefaEmAndamento.filter = filterValue.trim().toLowerCase();
  }

  public buscarTarefasEmAndamento(): void{
    this.todoService.getAllEmAndamento().subscribe({
      next: (tarefaRecebido: TarefaEmAndamento[]) => {
        this.tarefasEmAndamento = tarefaRecebido;
        this.dataSourceTarefaEmAndamento = new MatTableDataSource<TarefaEmAndamento>(this.tarefasEmAndamento);
        this.dataSourceTarefaEmAndamento.paginator = this.paginatorTarefaEmAndamento;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
        this.snackBar.open("Erro ao buscar tarefa", "OK", {
          duration: 5000
        })
      }
    });
  }

  mudarParaEmAndamento() {
    this.spinner.show();
    this.todoService.getTarefaById(this.idTarefa).subscribe({
      next: (tarefeRecebida: Tarefa) => {
        this.tarefaTransicao = tarefeRecebida;

          this.tarefaEmAndamento = {
            DescricaoTarefaEmAndamento: this.tarefaTransicao.DescricaoTarefa,
            UsuarioTarefaEmAndamento: this.tarefaTransicao.UsuarioTarefa
          }

          this.todoService.addTarefaEmAndamento(this.tarefaEmAndamento).then(res => {

            this.todoService.deleteTarefa(this.idTarefa).then(res => {
              this.spinner.hide();
              },
                err => {
                  this.spinner.hide();
                  this.snackBar.open("Erro ao deletar tarefa", "OK", {
                  duration: 5000
                })
              })

          this.spinner.hide();
          },
            err => {
              this.spinner.hide();
              this.snackBar.open("Erro ao adicionar tarefa", "OK", {
              duration: 5000
            })
          })

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

  applyFilterTarefaFinalizada(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTarefaFinalizada.filter = filterValue.trim().toLowerCase();
  }

  public buscarTarefasFinalizadas(): void{
    this.todoService.getAllTerminadas().subscribe({
      next: (tarefaRecebido: TarefaFinalizada[]) => {
        this.tarefasFinalizadas = tarefaRecebido;
        this.dataSourceTarefaFinalizada = new MatTableDataSource<TarefaFinalizada>(this.tarefasFinalizadas);
        this.dataSourceTarefaFinalizada.paginator = this.paginatorTarefaFinalizada;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
        this.snackBar.open("Erro ao buscar tarefa", "OK", {
          duration: 5000
        })
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }


  pegarIdTarefaEmAndamento(id: string) {
    this.idTarefaEmAndamento = id;
  }

  mudarParaFinalizada() {
    this.spinner.show();
    this.todoService.getTarefaEmAndamentoById(this.idTarefaEmAndamento).subscribe({
      next: (tarefeRecebida: TarefaEmAndamento) => {
        this.tarefaTransicao2 = tarefeRecebida;

          this.tarefaFinalizada = {
            DescricaoTarefaFinalizada: this.tarefaTransicao2.DescricaoTarefaEmAndamento,
            UsuarioTarefaFinalizada: this.tarefaTransicao2.UsuarioTarefaEmAndamento
          }

          this.todoService.addTarefaFinalizada(this.tarefaFinalizada).then(res => {

            this.todoService.deleteTarefaEmAndamento(this.idTarefaEmAndamento).then(res => {
              this.spinner.hide();
              },
                err => {
                  this.spinner.hide();
                  this.snackBar.open("Erro ao deletar tarefa", "OK", {
                  duration: 5000
                })
              })

          this.spinner.hide();
          },
            err => {
              this.spinner.hide();
              this.snackBar.open("Erro ao adicionar tarefa", "OK", {
              duration: 5000
            })
          })

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

  async deletarTarefaFinalizada(id: string): Promise<void> {
    const nomeDelete = "Tarefa";
    const confirmed = await this.modalService.openDeleteModal(nomeDelete);

    if (confirmed) {
      this.todoService.deleteTarefaFinalizada(id).then(res => {
        this.spinner.hide();
        },
          err => {
            this.spinner.hide();
            this.snackBar.open("Erro ao deletar tarefa", "OK", {
            duration: 5000
          })
        })
    } else {
      console.log('Delete canceled');
    }
  }

  async confirmDeletarTarefa(): Promise<void> {
    const nomeDelete = "Tarefa";
    const confirmed = await this.modalService.openDeleteModal(nomeDelete);

    if (confirmed) {
      this.todoService.deleteTarefa(this.idTarefa).then(res => {
        this.spinner.hide();
        },
          err => {
            this.spinner.hide();
            this.snackBar.open("Erro ao deletar tarefa", "OK", {
            duration: 5000
          })
        })
    } else {
      console.log('Delete canceled');
    }
  }

  async confirmDeletarTarefaEmAndamento(): Promise<void> {
    const nomeDelete = "Tarefa";
    const confirmed = await this.modalService.openDeleteModal(nomeDelete);

    if (confirmed) {
      this.todoService.deleteTarefaEmAndamento(this.idTarefaEmAndamento).then(res => {
        this.spinner.hide();
        },
          err => {
            this.spinner.hide();
            this.snackBar.open("Erro ao deletar tarefa", "OK", {
            duration: 5000
          })
        })
    } else {
      console.log('Delete canceled');
    }
  }

  updateTarefa() {
    this.router.navigate(['/componentes/home/update-tarefa', this.idTarefa, "tarefa"]);
  }

  updateTarefaEmAndamento() {
    this.router.navigate(['/componentes/home/update-tarefa', this.idTarefaEmAndamento, "tarefaEmAndamento"]);
  }

}


