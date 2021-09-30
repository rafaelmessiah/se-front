import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemCarrinhoModel } from './models/item-carrinho.model';
import { CarrinhoService } from './carrinho.service';
import { tap, switchMap, map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginService } from '../login/login.service';

@UntilDestroy()
@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class CarrinhoComponent implements OnInit {

  public itens: ItemCarrinhoModel[] =[]
  public contentHeader: object
  public valorTotal: number

  constructor(public carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Carrinho',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Produtos',
            isLink: true,
            link: '/produto'
          },
          {
            name: 'Carrinho',
            isLink: false,
            link: '/'
          },
        ]
      }
    }

    this.carrinhoService.itensCarrinho$
    .pipe(
      untilDestroyed(this),
      tap(itens => this.itens = itens),
      map(itens => 
        itens.reduce((a, b) => a += b.preco * b.qtde, 0.00)
      )
    )
    .subscribe(valor => this.valorTotal = valor)
  }
 }
