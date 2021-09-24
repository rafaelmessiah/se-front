import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ClienteLogadoModel } from './models/cliente-logado.model';
import { LoginModel } from './models/login.model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _clienteLogado = new BehaviorSubject<ClienteLogadoModel>({clienteId: 0 ,nome:"JOÃO SEM BRAÇO",});
  public clienteLogado$ = this._clienteLogado.asObservable();

  constructor(private http: HttpClient) {
    var model = localStorage.getItem("clienteLogado");
  }

  login(model: LoginModel){
    this.http.post<ClienteLogadoModel>(`${API_URL}/cliente/login`, model)
    .pipe(
      take(1)
    )
    .subscribe(clienteLogado => {this._clienteLogado.next(clienteLogado),
      window.localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado))}
    )
  }

}
