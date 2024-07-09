import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DadosUsuario } from '../model/dados-usuario';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private dadosUsuario = new BehaviorSubject<any>('');

  public receberDadosUsuario() {
    return this.dadosUsuario.asObservable();
  }

  public enviarDadosUsuario(dados: DadosUsuario) {
    this.dadosUsuario.next(dados);
  }

}
