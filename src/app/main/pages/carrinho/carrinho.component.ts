import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemCarrinhoModel } from './models/item-carrinho.model';
import { CarrinhoService } from './carrinho.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClienteService } from '../cliente/cliente.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { until } from 'selenium-webdriver';

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

  constructor(public carrinhoService: CarrinhoService, private clienteService: ClienteService) { }

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

    this.carrinhoService.buscarItens(this.clienteService.clienteId)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe()

    this.carrinhoService.itensCarrinho$
    .pipe(
      untilDestroyed(this),
      tap(itens => this.valorTotal = this.calcularValorTotal(itens))
    )
    .subscribe(itens => this.itens = itens)

    console.log(this.valorTotal)
  }

  calcularValorTotal(itens: ItemCarrinhoModel[]){
   let valor = 0;
   itens.forEach(element => {
     valor += element.qtde * element.preco
   });

   return valor
  }
  
}
