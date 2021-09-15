import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CadastroCartaoModel } from './models/cadastro-cartao.model';
import { CadastroEnderecoModel } from './models/cadastro-endereco.model';
import { CartaoDetalheModel } from './models/cartao-detalhe.model';
import { EnderecoModel } from './models/endereco.model';
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

  private _enderecos = new BehaviorSubject<EnderecoModel[]>([])
  public enderecos$ = this._enderecos.asObservable()

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

  cadastrarCartao(model: CadastroCartaoModel){
    return this.http.post<CartaoDetalheModel>(`${API_URL}/cartaocredito/`, model)
    .pipe(
      tap(resposta => {
        let cartoes = this._cartoes.value.slice();

        cartoes.push({
          cartaoCreditoId: resposta.cartaoCreditoId,
          clienteId: resposta.clienteId,
          numero: resposta.numero,
          dataVencimento: resposta.dataVencimento
        })

        this._cartoes.next(cartoes)
      })
    )
  }

  buscarEnderecos(clienteId: number){
    return this.http.get<EnderecoModel[]>(`${API_URL}/endereco/${clienteId}`)
    .pipe(
      take(1),
      tap(enderecos => this._enderecos.next(enderecos))
    )
  }

  cadastrarEndereco(model: CadastroEnderecoModel){
    return this.http.post<EnderecoModel>(`${API_URL}/endereco/`, model)
    .pipe(
      tap(resposta => {
        let enderecos = this._enderecos.value.slice()

        enderecos.push(resposta)

        this._enderecos.next(enderecos)
      })
    )
  }

}
