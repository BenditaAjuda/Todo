import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from '../../model/tarefa';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodoService } from '../../services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalTodoService } from '../../services/modal-todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  tarefaForm: FormGroup = new FormGroup({});
  usuarios: Usuario[] = [];
  edicaoHabilitada: boolean = false;

  // todoForm: FormGroup = new FormGroup({});
  // tarefas: Tarefa[] = [];
  // emProgresso: Tarefa[] = [];
  // terminadas: Tarefa[] = [];
  // updateIndex: any;
  // edicaoHabilitada: boolean = false;
  //
  // readonly dialog = inject(MatDialog);
  // tarefa!: Tarefa;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private spinner: NgxSpinnerService,
              private todoService: TodoService,
              private snackBar: MatSnackBar,
              private modalTodoService: ModalTodoService) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.spinner.show();
    this.buscarUsuarios();
    this.buscarTarefas();
    this.buscarTarefasEmAndamento();
    this.buscarTerminadas();

  }

  inicializarForm() {
    this.tarefaForm = this.formBuilder.group({
      item: ['', Validators.required],
      usuario: ['', Validators.required],
        })
  }

  drop(event: CdkDragDrop<Tarefa[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.todoForm.controls[controlName].hasError(errorName);
  }

  adicionarTarefa() {
    this.spinner.show();
    // this.tarefas.push({
    //   descricao: this.todoForm.value.item,
    //   terminada: false,
    //   usuario: this.todoForm.value.usuario
    // });
  this.tarefa = {
    descricao: this.todoForm.value.item,
    terminada: false,
    usuario: this.todoForm.value.usuario
  }

  this.todoService.addTarefa(this.tarefa).then(res => {
    this.spinner.hide();
  },
  err => {
    this.spinner.hide();
    this.snackBar.open("Erro ao adicionar tarefa", "OK", {
      duration: 5000
    })
  })
    this.spinner.hide();
    this.buscarTarefas();
    this.todoForm.reset();
  }

  deletarTarefa(index: number, id: string) {
    console.log("Aqui: ", id);
    this.tarefas.splice(index, 1);
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
    this.tarefas[this.updateIndex].descricao = this.todoForm.value.item;
    this.tarefas[this.updateIndex].terminada = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.edicaoHabilitada = false;
  }

  emEdicao(tarefa: Tarefa, index: number) {
    this.todoForm.controls['item'].setValue(tarefa.descricao);
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

  const updatedUsers = this.terminadas.reduce((acc, terminada) => {
    acc.push({ ...terminada, terminada: terminada.terminada = true });
    return acc;
  }, [] as Tarefa[]);

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
        console.log("Teste:", tarefaRecebido);
        this.tarefas = tarefaRecebido;
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


