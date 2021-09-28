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

  constructor(private http: HttpClient ) { }
  
  public buscarProdutos(categoriaId: number){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/${categoriaId}`)
    .pipe(
      take(1),
    );
  }

  public buscarTodos(){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/`)
    .pipe(
      take(1)
    );
  }

  public buscarCategorias(){
    return this.http.get<CategoriaModel[]>(`${API_URL}/categoria/`)
    .pipe(
      take(1)
    );
  }

  public buscarRanking(){
    return this.http.get<ProdutoSimplesModel[]>(`${API_URL}/produto/ranking`)
    .pipe(
      take(1)
    );
  }

  public obter(produtoId: number){
    return this.http.get<ProdutoDetalhadoModel>(`${API_URL}/produto/${produtoId}/detalhe/`)
    .pipe(
      take(1)
    );
  }

}
