import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodoService } from '../../services/todo.service';
import { Tarefa } from '../../model/tarefa';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../model/usuario';
import { TarefaEmAndamento } from '../../model/tarefa-andamento';

@Component({
  selector: 'app-todo-alterar',
  templateUrl: './todo-alterar.component.html',
  styleUrl: './todo-alterar.component.css'
})
export class TodoAlterarComponent {

  id: string | null = null;
  tipo: string | null = null;
  updateTodoForm!: FormGroup;
  updateTodoEmAndamentoForm!: FormGroup;
  hide: boolean = true;
  usuarios!: Usuario[];
  tarefa!: Tarefa;
  tarefaEmAndamento!: TarefaEmAndamento;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private todoService: TodoService,
              private usuarioService: UsuarioService,
              private router: Router) {}

  ngOnInit(): void {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    this.tipo = this.route.snapshot.paramMap.get('tipo');

    if(this.tipo === 'tarefa'){
      this.updateTodoForm = this.formBuilder.group({
        DescricaoTarefa: ['', [Validators.required]],
        UsuarioTarefa: ['', [Validators.required]],
      });
      this.buscarTarefaPorId();
    }
    if(this.tipo === 'tarefaEmAndamento') {
      this.updateTodoEmAndamentoForm = this.formBuilder.group({
        DescricaoTarefaEmAndamento: ['', [Validators.required]],
        UsuarioTarefaEmAndamento: ['', [Validators.required]],
      });
      this.buscarTarefaEmAndamentoPorId();
    }
    this.buscarUsuarios();
  }

  buscarTarefaPorId() {
    this.spinner.show();
    if(this.id != null)
    {
      this.todoService.getTarefaById(this.id).subscribe({
        next: (response: Tarefa) => {
          this.updateTodoForm.patchValue(response);
          this.tarefa = response;
          this.spinner.hide();
        },
        error: (erro: any) => {
          this.spinner.hide();
          this.snackBar.open("Erro ao buscar tarefa", "OK", {
            duration: 5000
          })

        }
      })
    }
  }

  buscarTarefaEmAndamentoPorId() {
    this.spinner.show();
    if(this.id != null)
    {
      this.todoService.getTarefaEmAndamentoById(this.id).subscribe({
        next: (response: TarefaEmAndamento) => {
          this.updateTodoEmAndamentoForm.patchValue(response);
          this.tarefaEmAndamento = response;
          this.spinner.hide();
        },
        error: (erro: any) => {
          this.spinner.hide();
          this.snackBar.open("Erro ao atualizar tarefa", "OK", {
            duration: 5000
          })
        }
      })
    }
  }

  buscarUsuarios() {
      this.usuarioService.getAllUsuarios().subscribe({
        next: (response: Usuario[]) => {
          this.usuarios = response;
          this.spinner.hide();
        },
        error: (erro: any) => {
          this.spinner.hide();
          this.snackBar.open("Erro ao buscar usuário", "OK", {
            duration: 5000
          })
        }
      })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.updateTodoForm.controls[controlName].hasError(errorName);
  }

  public checkErrorEmAndamento = (controlName: string, errorName: string) => {
    return this.updateTodoEmAndamentoForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.spinner.show();
    this.tarefa = this.updateTodoForm.value;
    if(this.id != null && this.tarefa != null){
      this.todoService.upDateTarefa(this.id, this.tarefa).then( res => {
        this.spinner.hide();
        this.router.navigate(['/componentes/home/todo']);
      },
      err => {
        this.spinner.hide();
        this.snackBar.open("Erro ao atualizar tarefa", "OK", {
          duration: 5000
        })
      })
    }
  }

  onSubmitEmAndamento() {
    this.spinner.show();
    this.tarefaEmAndamento = this.updateTodoEmAndamentoForm.value;
    if(this.id != null && this.tarefaEmAndamento != null){
      this.todoService.upDateTarefaEmAndamento(this.id, this.tarefaEmAndamento).then( res => {
        this.spinner.hide();
        this.router.navigate(['/componentes/home/todo']);
      },
      err => {
        this.spinner.hide();
        this.snackBar.open("Erro ao atualizar tarefa", "OK", {
          duration: 5000
        })
      })
    }
  }
}


