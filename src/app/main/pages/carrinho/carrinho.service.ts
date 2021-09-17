import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemCarrinhoModel } from './models/item-carrinho.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { SalvarModel } from './models/salvar.model';
import { VerificarItemModel } from './models/verificar-item.model';
import { BehaviorSubject } from 'rxjs';
import { EdicaoQtdeModel } from './models/edicao-qtde.model';

const API_URL = environment.apiUrl

@Injectable()
export class CarrinhoService {

  private _itensCarrinho = new BehaviorSubject<ItemCarrinhoModel[]>([]);
  public itensCarrinho$ = this._itensCarrinho.asObservable();

  private valorTotal = new BehaviorSubject<number>(0)
  public valorTotal$ = this.valorTotal.asObservable();

  constructor(private http: HttpClient) { }

  buscarItens(clienteId: number){
    return this.http.get<ItemCarrinhoModel[]>(`${API_URL}/carrinho/${clienteId}`)
    .pipe(
      take(1),
      tap(itens => this._itensCarrinho.next(itens))
    );
  }

  calcularValorTotal(clienteId: number){
    return this.http.get<number>(`${API_URL}/carrinho/${clienteId}/calcular`)
    .pipe(
      take(1),
      tap(valor => this.valorTotal.next(valor))
    )
  }

  remover(carrinhoId: number, clienteId: number){
    let itens = this._itensCarrinho.getValue();
    let excluido = itens.find(i => i.carrinhoId);
    itens = itens.filter(i => i.carrinhoId != carrinhoId);
    this._itensCarrinho.next(itens);

    return this.http.put<boolean>(`${API_URL}/carrinho/${carrinhoId}/alterar/status`, {"statusEnum":2})
    .pipe(
      take(1),
      tap(null, err => {
        itens.push(excluido)
        this._itensCarrinho.next(itens)
      })
    )
  }
  
  inserir(model: SalvarModel){
    return this.http.post<boolean>(`${API_URL}/carrinho/`, model)
    .pipe(
      take(1)
    )
  }

  alterarQtde(carrinhoId:number, model: EdicaoQtdeModel){
    let itens = this._itensCarrinho.getValue()
    let index = itens.findIndex(a => a.carrinhoId == carrinhoId)
    const qtdeAnterior = itens[index].qtde
    itens[index].qtde = model.qtde
    this._itensCarrinho.next(itens)

    return this.http.put<boolean>(`${API_URL}/carrinho/${carrinhoId}/alterar/qtde`, model)
    .pipe(
      take(1),
      tap(null, err => {
        itens[index].qtde = qtdeAnterior
        this._itensCarrinho.next(itens)
      })
    )
  }
 
}
