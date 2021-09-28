import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProdutoSimplesModel } from '../models/produto-simples.model';
import { ProdutoService } from '../produto.service';
import { LoginService } from '../../login/login.service';

@UntilDestroy()
@Component({
  selector: 'app-produto-ranking',
  templateUrl: './produto-ranking.component.html',
  styleUrls: ['./produto-ranking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutoRankingComponent implements OnInit {

  public produtos: ProdutoSimplesModel[] = []
  contentHeader: object

  constructor(private produtoService: ProdutoService,
              private loginService: LoginService) { }

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

    this.produtoService.buscarRanking()
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(categorias=>{
      this.produtos = categorias;
    })
  }
}
