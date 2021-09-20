import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CompraItemModel } from './models/compra-item.model';

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


}
