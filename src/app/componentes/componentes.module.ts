import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesRoutingModule } from './componentes-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoComponent } from './todo/todo.component';
import { UsuarioComponent } from './gerenciar-usuario/usuario/usuario.component';
import { UpdateUsuarioComponent } from './gerenciar-usuario/update-usuario/update-usuario.component';
import { AddUsuarioComponent } from './gerenciar-usuario/add-usuario/add-usuario.component';
import { TodoAlterarComponent } from './todo-alterar/todo-alterar.component';
import { TarefasComponent } from './tarefas/tarefas.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    TodoComponent,
    UsuarioComponent,
    UpdateUsuarioComponent,
    AddUsuarioComponent,
    TodoAlterarComponent,
    TarefasComponent
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule,
    MatToolbarModule,
    DragDropModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class ComponentesModule { }
