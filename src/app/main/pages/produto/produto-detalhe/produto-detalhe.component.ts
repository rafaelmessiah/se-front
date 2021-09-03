import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProdutoDetalhadoModel } from '../Models/produto-detalhe.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutoDetalheComponent implements OnInit {

  produto: ProdutoDetalhadoModel
  produtoId: number

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.produtoId = +params['produtoId']
    })

    this.produtoService.obter(this.produtoId)
    .subscribe(produto=>
      this.produto = produto
    )
  }

}
