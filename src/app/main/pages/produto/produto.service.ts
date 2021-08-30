import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProdutoSimplesModel } from './Models/produto-simples-model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private _produtos = new BehaviorSubject<ProdutoSimplesModel[]>([]);
  public produtos$ = this._produtos.asObservable();

  constructor(private http: HttpClient ) { }

  buscar(){
    return this.buscarProdutos()
  }

  private buscarProdutos(){
    return this.http.get<ProdutoSimplesModel[]>(API_URL + "/produto")
    .pipe(
      take(1)
    );
  }

}
