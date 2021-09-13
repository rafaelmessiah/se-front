import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProdutoSimplesModel } from '../models/produto-simples.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-ranking',
  templateUrl: './produto-ranking.component.html',
  styleUrls: ['./produto-ranking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutoRankingComponent implements OnInit {

  public produtos: ProdutoSimplesModel[] = []
  contentHeader: object

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {

    this.contentHeader = {
      headerTitle: 'Produtos',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Selecionar Categoria',
            isLink: true,
            link: '/'
          },
        ]
      }
    }

    this.produtoService.buscarRanking().subscribe(categorias=>{
      this.produtos = categorias;
    })
  }

}
