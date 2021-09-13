import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemCarrinhoModel } from './models/item-carrinho.model';
import { CarrinhoService } from './carrinho.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  public clienteId: number = 1
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

    this.carrinhoService.buscarItens(this.clienteId).subscribe()

    this.carrinhoService.itensCarrinho$
    .pipe(
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
