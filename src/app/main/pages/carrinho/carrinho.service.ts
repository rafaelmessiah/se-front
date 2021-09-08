import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemCarrinhoModel } from './models/item-carrinho.model';
import { take } from 'rxjs/operators';
import { SalvarModel } from './models/salvar.model';
import { VerificarItemModel } from './models/verificar-item.model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  

  constructor(private http: HttpClient) { }

  //Métodos Públicos
  buscarItens(clienteId: number){
    return this._buscarItens(clienteId)
  }

  calcularValorTotal(itens : ItemCarrinhoModel[]){
    let valorTotal = 5.00;

    itens.forEach(item => {
      valorTotal += item.preco * item.qtde
    });

    return valorTotal
  }

  remover(carrinhoId: number){
    return this._remover(carrinhoId)
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

}
