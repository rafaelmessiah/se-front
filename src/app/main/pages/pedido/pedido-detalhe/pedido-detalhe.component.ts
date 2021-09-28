import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';
import { ClienteService } from '../../cliente/cliente.service';
import { CompraDetalhadaModel } from '../models/compra-detalhada.model';
import { CompraItemModel } from '../models/compra-item.model';
import { ItemProdutoCompraModel } from '../models/item-produto-compra.model';
import { PedidoService } from '../pedido.service';
import { LoginService } from '../../login/login.service';

@UntilDestroy()
@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.scss']
})
export class PedidoDetalheComponent implements OnInit {

  contentHeader: object
  clienteId: number
  compraId: number
  compraDetalhada: CompraDetalhadaModel
  itensComprados: ItemProdutoCompraModel[] = []
  
  constructor(private pedidoService: PedidoService,
              private loginService: LoginService,
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

    //Pega o compraId pelo parametro
    this.route.params
    .pipe(
      untilDestroyed(this), 
    )
    .subscribe((params : Params) => 
    this.compraId = +params['compraId'])
    
    //Pega o clienteId pelo login service
    this.loginService.clienteLogado$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(cliente => this.clienteId = cliente.clienteId)
    
    this.pedidoService.obter(this.compraId, this.clienteId)
    .pipe(
      untilDestroyed(this),
      tap(compra => this.itensComprados = compra.itensComprados)
    )
    .subscribe(compra => this.compraDetalhada = compra)
  }
}
