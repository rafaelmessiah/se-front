import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProdutoSimplesModel } from '../../models/produto-simples.model';
import { ProdutoService } from '../../produto.service';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class ProdutoItemComponent implements OnInit {

  public produtos: ProdutoSimplesModel[]= [];
  public categoriaId: number = 0
  public estaNoCarrinho: boolean

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.categoriaId = +params['categoriaId'];
    // })

    // this.produtoService.buscar(this.categoriaId).subscribe(produtos=>{
    //   this.produtos = produtos;
    // });

    if(this.categoriaId === 0){
      this.produtoService.buscarTodos().subscribe(produtos =>{
        this.produtos = produtos
      });
    }

    this.route.params
    .pipe(
      tap(params => this.categoriaId = +params['categoriaId']),
      switchMap(() => this.produtoService.buscarProdutos(this.categoriaId)
      .pipe(
        tap(produto => {
          this.produtos = produto;
        })
      ))
    ).subscribe();

   
  }

}
