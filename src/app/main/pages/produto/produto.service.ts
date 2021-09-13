import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoriaModel } from './models/categoria.model';
import { ProdutoDetalhadoModel } from './models/produto-detalhe.model';
import { ProdutoSimplesModel } from './models/produto-simples.model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private _produtos = new BehaviorSubject<ProdutoSimplesModel[]>([]);

  private _categorias = new BehaviorSubject<CategoriaModel[]>([]);
  
  constructor(private http: HttpClient ) { }


  // Métdos Publicos

  buscarProdutos(categoriaId: number){
    return this._buscarProdutos(categoriaId)
  }

  buscarTodos(){
    return this._buscarTodos()
  }

  buscarCategorias(){
    return this._buscarCategorias()
  }

  buscarRanking(){
    return this._buscarRanking()
  }

  obter(produtoId: number){
    return this._obter(produtoId)
  }

  //Métodos Privados

  private _buscarProdutos(categoriaId: number){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/${categoriaId}`)
    .pipe(
      take(1)
    );
  }

  private _buscarTodos(){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/`)
    .pipe(
      take(1)
    );
  }

  private _buscarCategorias(){
    return this.http.get<CategoriaModel[]>(`${API_URL}/categoria/`)
    .pipe(
      take(1)
    );
  }

  private _buscarRanking(){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/ranking`)
    .pipe(
      take(1)
    );
  }

  private _obter(produtoId: number){
    return this.http.get<ProdutoDetalhadoModel>(`${API_URL}/produto/${produtoId}/detalhe/`)
    .pipe(
      take(1)
    );
  }

}
