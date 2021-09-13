import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { EnderecoModel } from './models/endereco.model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private _enderecos = new BehaviorSubject<EnderecoModel[]>([])
  public enderecos$ = this._enderecos.asObservable()

  constructor(private http: HttpClient) { }

  buscar(clienteId: number){
    return this.http.get<EnderecoModel[]>(`${API_URL}/endereco/${clienteId}`)
    .pipe(
      take(1),
      tap(enderecos => this._enderecos.next(enderecos))
    )
  }


}
