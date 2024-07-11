import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from '../../model/tarefa';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoService } from '../../services/modal-todo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  tarefaForm: FormGroup = new FormGroup({});
  usuarios: Usuario[] = [];
  edicaoHabilitada: boolean = false;
  tarefa!: Tarefa;
  tarefas: Tarefa[] = [];
  emProgresso: Tarefa[] = [];
  terminadas: Tarefa[] = [];
  updateIndex: any;

  idTarefa: string = "";
  nomeTarefa: string = "";
  displayedColumnsTarefa: string[] = ['firebaseId', 'descricao', 'usuario', 'star'];
  dataSourceTarefa = new MatTableDataSource<Tarefa>(this.tarefas);
  @ViewChild(MatPaginator) paginatorTarefa!: MatPaginator;
  @ViewChild(MatSort) sortTarefa!: MatSort;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private spinner: NgxSpinnerService,
              private todoService: TodoService,
              private snackBar: MatSnackBar,
              private modalTodoService: ModalTodoService) {}

    applyFilterTarefa(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTarefa.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.inicializarTarefaForm();
    this.buscarTarefas();
    this.buscarUsuarios();
  }

  inicializarTarefaForm() {
    this.tarefaForm = this.formBuilder.group({
      descricao: ['', Validators.required],
      usuario: ['', Validators.required],
        })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.tarefaForm.controls[controlName].hasError(errorName);
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
  }

  passarTarefaParaEmAndamento() {
    this.deletarTarefa();

  }

  updateTarefa() {

  }

  pegarIdTarefa(id: string) {
    this.idTarefa = id;
    console.log(id)
  }

  deletarTarefa() {
    this.todoService.deleteTarefa(this.idTarefa)
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
  }

  adicionarTarefaEmAndamento() {
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
  }

  deletarEmProgresso(index: number) {
    //console.log("Aqui: ", index);
    this.emProgresso.splice(index, 1);
  }

  deletarTerminadas(index: number) {
    //console.log("Aqui: ", index);
    this.terminadas.splice(index, 1);
  }

  editarTarefa() {
    this.tarefas[this.updateIndex].descricao = this.tarefaForm.value.item;
    this.tarefaForm.reset();
    this.updateIndex = undefined;
    this.edicaoHabilitada = false;
  }

  emEdicao(tarefa: Tarefa, index: number) {
    this.tarefaForm.controls['item'].setValue(tarefa.descricao);
    this.updateIndex = index;
    this.edicaoHabilitada = true;
  }

  public buscarUsuarios(): void{
    this.usuarioService.getAllUsuarios().subscribe({
      next: (usuarioRecebido: Usuario[]) => {
        this.usuarios = usuarioRecebido;
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

  deletarTabelas(){
    this.limparTabelas("Tarefas");
    this.limparTabelas("EmAndamento");
    this.limparTabelas("Terminadas");

    this.confirmDelete();
  }

popularTabelas() {
  this.adicionarTabelas("Tarefas", this.tarefas);
  this.adicionarTabelas("EmAndamento", this.emProgresso);


  this.adicionarTabelas("Terminadas", this.terminadas);
}

  limparTabelas(collection: string) {
    this.todoService.deleteAllDocuments(collection).then(res => {
      console.log('All documents deleted successfully!');
    },
    err => {
      this.snackBar.open("Erro ao limpar tabelas", "OK", {
        duration: 5000
      })
    });
}

  adicionarTabelas(collection: string, data: any) {
    this.todoService.addArray(collection, data).then(res => {
      console.log('All documents adicionados successfully!');
    },
    err => {
      this.snackBar.open("Erro ao adicionar tabelas", "OK", {
        duration: 5000
      })
    })
  }

  async confirmDelete(): Promise<void> {
    const avancar = "Avançar"
    const confirmed = await this.modalTodoService.openDeleteModal(avancar);

    this.popularTabelas();
  }

  public buscarTarefas(): void{
    this.todoService.getAlTarefas().subscribe({
      next: (tarefaRecebido: Tarefa[]) => {
        this.tarefas = tarefaRecebido;
        console.log("Aqui: ", this.tarefas);
        this.dataSourceTarefa = new MatTableDataSource<Tarefa>(this.tarefas);
        console.log("Aqui: ", this.dataSourceTarefa);
        this.dataSourceTarefa.paginator = this.paginatorTarefa;
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

  public buscarTarefasEmAndamento(): void{
    this.todoService.getAllEmAndamento().subscribe({
      next: (emAndamento: Tarefa[]) => {
        this.emProgresso = emAndamento;
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

  public buscarTerminadas(): void{
    this.todoService.getAllTerminadas().subscribe({
      next: (terminadas: Tarefa[]) => {
        this.terminadas = terminadas;
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





}


