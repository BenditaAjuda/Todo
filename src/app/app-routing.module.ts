import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecuperarContaComponent } from './recuperar-conta/recuperar-conta.component';
import { authguardGuard } from './authguard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'recuperarConta', component: RecuperarContaComponent },
  {path: 'componentes', loadChildren: () => import('./componentes/componentes.module').then(m => m.ComponentesModule), canActivate:[authguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
