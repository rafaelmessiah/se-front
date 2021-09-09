import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemCarrinhoModel } from './models/item-carrinho.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { SalvarModel } from './models/salvar.model';
import { VerificarItemModel } from './models/verificar-item.model';
import { BehaviorSubject } from 'rxjs';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private _itensCarrinho = new BehaviorSubject<ItemCarrinhoModel[]>([]);
  public itensCarrinho$ = this._itensCarrinho.asObservable();

  private valorTotal = new BehaviorSubject<number>(0)
  public valorTotal$ = this.valorTotal.asObservable();

  constructor(private http: HttpClient) { }

  //Métodos Públicos
  buscarItens(clienteId: number){
    return this._buscarItens(clienteId)
    .pipe(
      tap(itens => this._itensCarrinho.next(itens))
    );
  }

  calcularValorTotal(clienteId: number){
    return this._calcularValorTotal(clienteId)
    .pipe(
      tap(valor => this.valorTotal.next(valor))
    )
  }

  remover(carrinhoId: number, clienteId: number){



    return this._remover(carrinhoId)
    .pipe(
      switchMap(() => this.buscarItens(clienteId)),
      switchMap(() => this.calcularValorTotal(clienteId))
    )
  }
  
  inserir(model: SalvarModel){
    return this._inserir(model)
  }

  verificarItem(model: VerificarItemModel){
    return this._verificarItem(model)
  }
 
  //Métodos Privados
  private _buscarItens(clienteId: number){
    return this.http.get<ItemCarrinhoModel[]>(`${API_URL}/carrinho/${clienteId}`)
    .pipe(
      take(1)
    );
  }

  private _remover(carrinhoId: number){
    return this.http.put<boolean>(`${API_URL}/carrinho/${carrinhoId}/alterar/status`, {"statusEnum":2})
    .pipe(
      take(1)
    )
  }  

  private _inserir(model: SalvarModel){
    return this.http.post<boolean>(`${API_URL}/carrinho/`, model)
    .pipe(
      take(1)
    )
  }

  private _verificarItem(model: VerificarItemModel){
    const options ={
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      }),
      body: model
    };

    return this.http.get<boolean>(`${API_URL}/carrinho/verificar`, options)
  }

  private _calcularValorTotal(clienteId: number){
    return this.http.get<number>(`${API_URL}/carrinho/${clienteId}/calcular`)
    .pipe(
      take(1)
    )
  }

}
