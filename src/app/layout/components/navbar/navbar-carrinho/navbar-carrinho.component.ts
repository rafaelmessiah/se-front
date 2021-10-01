import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from 'app/main/pages/carrinho/carrinho.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs/operators';
import { ItemCarrinhoModel } from '../../../../main/pages/carrinho/models/item-carrinho.model';

@UntilDestroy()
@Component({
  selector: 'app-navbar-carrinho',
  templateUrl: './navbar-carrinho.component.html',
  styleUrls: ['./navbar-carrinho.component.scss']
})
export class NavbarCarrinhoComponent implements OnInit {

  itens: ItemCarrinhoModel[] = []
  valorTotal: number
  qtde: number

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit() {
    this.carrinhoService.itensCarrinho$
    .pipe(
      untilDestroyed(this),
      tap(itens => this.itens = itens),
      tap(itens => this.qtde = itens.length),
      map(itens => 
        itens.reduce((a, b) => a += b.preco * b.qtde, 0.00)
      )
    )
    .subscribe(valor => this.valorTotal = valor)
  }

  alterarQtde(qtde:number, carrinhoId: number){
    this.carrinhoService.alterarQtde(carrinhoId, {qtde})
    .pipe(
      untilDestroyed(this)
    )
    .subscribe()
  }

  remover(carrinhoId: number){
    this.carrinhoService.remover(carrinhoId)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe()
  }

}
