import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ItemCarrinhoModel } from './models/item-carrinho.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { SalvarModel } from './models/salvar.model';
import { VerificarItemModel } from './models/verificar-item.model';
import { BehaviorSubject } from 'rxjs';
import { EdicaoQtdeModel } from './models/edicao-qtde.model';



const API_URL = environment.apiUrl
const apiViaCep = "viacep.com.br/ws/01001000/json/"

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

  testeCorreio(){
    let params = new HttpParams

    params.set('nCdEmpresa', '08082650');
    params.set('sDsSenha', '564321');
    params.set('sCepOrigem', '70002900');
    params.set('sCepDestino', '04547000');
    params.set('nVlPeso', '1');
    params.set('nCdFormato', '1');
    params.set('nVlComprimento', '20');
    params.set('nVlAltura', '20');
    params.set('nVlLargura', '20');
    params.set('sCdMaoPropria', 'n');
    params.set('nVlValorDeclarado', '0');
    params.set('sCdAvisoRecebimento', 'n');
    params.set('nCdServico', '04510');
    params.set('nVlDiametro', '0');
    params.set('StrRetorno', 'xml');
    params.set('nIndicaCalculo', '0');

    return this.http.post(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?`, {params})
    .pipe(
      take(1)
    )
  }

  testeViaCep(){
    return this.http.get("//viacep.com.br/ws/01001000/json/")
    .pipe(
      take(1)
      )
  }

  
  
}
