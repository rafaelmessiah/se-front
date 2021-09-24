import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CompraDetalhadaModel } from './models/compra-detalhada.model';
import { CompraItemModel } from './models/compra-item.model';
import { ItemProdutoCompraModel } from './models/item-produto-compra.model';

const API_URL = environment.apiUrl

@Injectable()
export class PedidoService {

  constructor(private http: HttpClient) { }

  buscarPedidos(clienteId: number){
    return this.http.get<CompraItemModel[]>(`${API_URL}/compra/${clienteId}`)
    .pipe(
      take(1)
    )
  }

  buscarItens(compraId: number){
    return this.http.get<ItemProdutoCompraModel[]>(`${API_URL}/listaprodutocompra/${compraId}`)
    .pipe(
      take(1)
    )
  }

  obter(compraId: number, clienteId: number){
    return this.http.get<CompraDetalhadaModel>(`${API_URL}/compra/${compraId}/detalhe/${clienteId}`)
    .pipe(
      take(1)
    )
  }
}
