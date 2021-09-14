import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CartaoDetalheModel } from './models/cartao-detalhe.model';
import { FormaPagamentoModel } from './models/forma-pagamento.model';
import { IniciarModel } from './models/iniciar.model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  private _cartoes = new BehaviorSubject<CartaoDetalheModel[]>([])
  public cartoes$ = this._cartoes.asObservable()

  buscarFormaPagamento(){
    return this.http.get<FormaPagamentoModel[]>(`${API_URL}/formapagamento`)
    .pipe(
      take(1)
    )
  }

  cadastrar(model: IniciarModel){
    return this.http.post(`${API_URL}/compra`, model)
    .pipe(
      take(1)
    )
  }

  buscarCartoes(clienteId: number){
    return this.http.get<CartaoDetalheModel[]>(`${API_URL}/cartaocredito/${clienteId}`)
    .pipe(
      take(1),
      tap(cartoes => this._cartoes.next(cartoes))
    )
  }

}
