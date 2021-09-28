import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ClienteLogadoModel } from './models/cliente-logado.model';
import { LoginModel } from './models/login.model';
import { Router, Routes } from '@angular/router';
import { CadastroClienteModel } from './models/cadastro-cliente.model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _clienteLogado = new BehaviorSubject<ClienteLogadoModel>(null);
  public clienteLogado$ = this._clienteLogado.asObservable();

  constructor(private http: HttpClient,
              private router: Router) {
    this._clienteLogado.next(JSON.parse(localStorage.getItem('clienteLogado')))
  }

  login(model: LoginModel){
    return this.http.post<ClienteLogadoModel>(`${API_URL}/cliente/login`, model)
    .pipe(
      take(1),
      tap(clienteLogado => this._clienteLogado.next(clienteLogado)),
      tap(clienteLogado => window.localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado)))
    )
  }

  lougout(){
    this.router.navigate(['/login'])
    this._clienteLogado.next(null)
    window.localStorage.setItem("clienteLogado", null)
  }

  cadastrar(model: CadastroClienteModel){
    return this.http.post<ClienteLogadoModel>(`${API_URL}/cliente/`, model)
    .pipe(
      take(1),
      tap(clienteLogado => this._clienteLogado.next(clienteLogado)),
      tap(clienteLogado => window.localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado)))
    )
  }
}
