import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { take } from 'rxjs/operators';
import { FormaPagamentoModel } from './models/forma-pagamento.model';
import { IniciarModel } from './models/iniciar.model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

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

}
