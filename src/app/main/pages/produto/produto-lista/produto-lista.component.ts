import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriaModel } from '../models/categoria.model';
import { ProdutoSimplesModel } from '../models/produto-simples.model';
import { ProdutoService } from '../produto.service';

@UntilDestroy()
@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {

  public categorias: CategoriaModel[] =[];
  public produtos: ProdutoSimplesModel[]= [];
  private _categoriaSelecionada = new BehaviorSubject<number>(1)
  public categoriaSelecionada$ = this._categoriaSelecionada.asObservable()
  
  constructor(private produtoService: ProdutoService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {

    //Busca as categorias do banco
    this.produtoService.buscarCategorias()
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(categorias=>{
      this.categorias = categorias;
    })

    this.produtoService.buscarTodos()
    .subscribe(produtos => this.produtos = produtos)
    
  }
   
  onSelect(categoriaId: number){

    if(categoriaId == 0){
      this.produtoService.buscarTodos()
      .subscribe(produtos => this.produtos = produtos)
    }
    else{
      this.produtoService.buscarProdutos(categoriaId)
      .subscribe(produtos => this.produtos = produtos)
    }
    
  }
}
