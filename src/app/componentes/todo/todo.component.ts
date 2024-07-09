import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarefa } from '../../model/tarefa';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  todoForm: FormGroup = new FormGroup({});
  tarefas: Tarefa[] = [];
  emProgresso: Tarefa[] = [];
  terminadas: Tarefa[] = [];
  updateIndex: any;
  edicaoHabilitada: boolean = false;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm() {
    this.todoForm = this.formBuilder.group({
      item: ['', Validators.required],
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
    this.tarefas.push({
      descricao: this.todoForm.value.item,
      terminada: false
    });
    this.todoForm.reset();
  }

  deletarTarefa(index: number) {
    console.log("Aqui: ", index);
    this.tarefas.splice(index, 1);
  }

  deletarEmProgresso(index: number) {
    console.log("Aqui: ", index);
    this.emProgresso.splice(index, 1);
  }

  deletarTerminadas(index: number) {
    console.log("Aqui: ", index);
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

}
