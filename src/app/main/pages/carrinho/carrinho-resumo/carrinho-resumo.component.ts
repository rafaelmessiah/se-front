import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinhoModel } from '../models/item-carrinho.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-carrinho-resumo',
  templateUrl: './carrinho-resumo.component.html',
  styleUrls: ['./carrinho-resumo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarrinhoResumoComponent implements OnInit {

  itens: ItemCarrinhoModel[]
  valorTotal: number

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit() {
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
