import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';
import { UsuarioComponent } from './gerenciar-usuario/usuario/usuario.component';
import { UpdateUsuarioComponent } from './gerenciar-usuario/update-usuario/update-usuario.component';
import { AddUsuarioComponent } from './gerenciar-usuario/add-usuario/add-usuario.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent,
    children: [
      {path: 'todo', component: TodoComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'listar-usuarios', component: UsuarioComponent},
      {path: 'update-usuario/:id/:mode', component: UpdateUsuarioComponent},
      {path: 'add-usuario', component: AddUsuarioComponent},
    ],
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentesRoutingModule { }
