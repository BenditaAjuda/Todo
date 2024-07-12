import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Tarefa } from '../../model/tarefa';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarefaEmAndamento } from '../../model/tarefa-andamento';
import { TarefaFinalizada } from '../../model/tarefa-finalizada';
import { TodasTarefas } from '../../model/todas-tarefas'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent implements OnInit{

  tarefas!: Tarefa[];
  tarefasEmAndamento!: TarefaEmAndamento[];
  tarefasFinalizadas!: TarefaFinalizada[];
  todasTarefas!: TodasTarefas[];
  todasTarefas2!: TodasTarefas[];
  todasTarefas3!: TodasTarefas[];
  tarefaConbinadas!: TodasTarefas[];
  displayedColumns: string[] = ['usuario', 'descricao', 'status'];
  dataSource = new MatTableDataSource<TodasTarefas>(this.tarefaConbinadas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private todoService: TodoService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.buscarTarefas();
    this.buscarTarefasEmAndamento();
    this.buscarTarefasFinalizadas();
  }

  public buscarTarefas(): void{
    this.todoService.getAlTarefas().subscribe({
      next: (tarefaRecebida: Tarefa[]) => {
        this.tarefas = tarefaRecebida;

        this.todasTarefas = this.tarefas?.map(item => ({
          usuario: item.UsuarioTarefa,
          descricao: item.DescricaoTarefa,
          status: "Tarefa"
        }));

        this.tarefaConbinadas = [...this.todasTarefas];

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

  public buscarTarefasEmAndamento(): void{
    this.todoService.getAllEmAndamento().subscribe({
      next: (tarefaRecebida2: TarefaEmAndamento[]) => {
        this.tarefasEmAndamento = tarefaRecebida2;

        this.todasTarefas2 = this.tarefasEmAndamento?.map(item => ({
          usuario: item.UsuarioTarefaEmAndamento,
          descricao: item.DescricaoTarefaEmAndamento,
          status: "Em Andamento"
        }));

        this.tarefaConbinadas = [...this.todasTarefas, ...this.todasTarefas2];

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

  public buscarTarefasFinalizadas(): void{
    this.todoService.getAllTerminadas().subscribe({
      next: (tarefaRecebida3: TarefaFinalizada[]) => {
        this.tarefasFinalizadas = tarefaRecebida3;

        this.todasTarefas3 = this.tarefasFinalizadas?.map(item => ({
          usuario: item.UsuarioTarefaFinalizada,
          descricao: item.DescricaoTarefaFinalizada,
          status: "Finalizadas"
        }));

        this.tarefaConbinadas = [...this.todasTarefas, ...this.todasTarefas2, ...this.todasTarefas3];

        this.dataSource = new MatTableDataSource<TodasTarefas>(this.tarefaConbinadas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
