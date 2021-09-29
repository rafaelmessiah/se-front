import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CategoriaModel } from './models/categoria.model';
import { ProdutoDetalhadoModel } from './models/produto-detalhe.model';
import { ProdutoSimplesModel } from './models/produto-simples.model';

const API_URL = environment.apiUrl

@Injectable()
export class ProdutoService {

  private _produtos = new BehaviorSubject<ProdutoSimplesModel[]>([])
  public produtos$ = this._produtos.asObservable();

  private _categorias = new BehaviorSubject<CategoriaModel[]>([])
  public categorias$ = this._produtos.asObservable();

  private _produtoDetalhe = new BehaviorSubject<ProdutoDetalhadoModel>(null)
  public produtoDetahe$ = this._produtoDetalhe.asObservable();

  constructor(private http: HttpClient ) { }
  
  public buscarProdutos(categoriaId: number){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/${categoriaId}`)
    .pipe(
      take(1),
      tap(produtos => this._produtos.next(produtos))
    );
  }

  public buscarTodos(){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/`)
    .pipe(
      take(1),
      tap(produtos => this._produtos.next(produtos))
    );
  }

  public buscarCategorias(){
    return this.http.get<CategoriaModel[]>(`${API_URL}/categoria/`)
    .pipe(
      take(1),
      tap(categorias => this._categorias.next(categorias))
    );
  }

  public buscarRanking(){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/ranking`)
    .pipe(
      take(1),
      tap(produtos => this._produtos.next(produtos))
    );
  }

  public obter(produtoId: number){
    return this.http.get<ProdutoDetalhadoModel>(`${API_URL}/produto/${produtoId}/detalhe/`)
    .pipe(
      take(1),
      tap(produto => this._produtoDetalhe.next(produto))
    );
  }

}
