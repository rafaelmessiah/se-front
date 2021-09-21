import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { ClienteService } from '../../cliente/cliente.service';
import { CompraDetalhadaModel } from '../models/compra-detalhada.model';
import { CompraItemModel } from '../models/compra-item.model';
import { ItemProdutoCompraModel } from '../models/item-produto-compra.model';
import { PedidoService } from '../pedido.service';

@UntilDestroy()
@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.scss']
})
export class PedidoDetalheComponent implements OnInit {

  contentHeader: object
  itensComprados: ItemProdutoCompraModel[] = []
  compraId: number
  compraDetalhada: CompraDetalhadaModel
  
  
  constructor(private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Finalizar Compra',
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
            isLink: true,
            link: '/carrinho'
          },
          {
            name: 'Finalizar Compra',
            isLink: false,
            link: '/compra/finalizar'
          },
        ]
      }
    }

    this.route.params
    .pipe(
      untilDestroyed(this), 
    )
    .subscribe((params : Params) => 
    this.compraId = +params['compraId'])
    
    this.pedidoService.obter(this.compraId)
    .pipe(
      untilDestroyed(this),
      tap(compra => this.itensComprados = compra.itensComprados)
    )
    .subscribe(compra => this.compraDetalhada = compra)
    
  }

 
}
