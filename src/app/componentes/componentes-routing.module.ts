import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent,
    children: [
      {path: 'todo', component: TodoComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'usuarios', component: UsuarioComponent}
    ]
   },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentesRoutingModule { }
