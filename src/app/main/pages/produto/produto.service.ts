import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoriaModel } from './models/categoria.model';
import { ProdutoSimplesModel } from './models/produto-simples.model';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private _produtos = new BehaviorSubject<ProdutoSimplesModel[]>([]);
  public produtos$ = this._produtos.asObservable();

  private _categorias = new BehaviorSubject<CategoriaModel[]>([]);
  public categorias$ = this._categorias.asObservable();

  constructor(private http: HttpClient ) { }

  buscar(categoriaId: number){
    return this.buscarProdutos(categoriaId)
  }

  private buscarProdutos(categoriaId: number){
    return this.http.get<ProdutoSimplesModel[]>(API_URL + "/produto/" + categoriaId)
    .pipe(
      take(1)
    );
  }

  buscarCategorias(){
    return this._buscarCategorias()
  }

  private _buscarCategorias(){
    return this.http.get<CategoriaModel[]>(API_URL + "/categoria")
    .pipe(
      take(1)
    );
  }

}
