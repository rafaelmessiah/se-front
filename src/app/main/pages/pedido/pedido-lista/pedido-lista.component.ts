import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { LoginService } from '../../login/login.service';
import { CompraItemModel } from '../models/compra-item.model';
import { PedidoService } from '../pedido.service';

@UntilDestroy()
@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent implements OnInit {

  contentHeader: object
  clienteId: number
  pedidos: CompraItemModel[] = []

  constructor(private pedidoService: PedidoService,
              private loginService: LoginService) { }

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

    this.loginService.clienteLogado$
    .pipe(
      untilDestroyed(this),
    )
    .subscribe(cliente => this.clienteId = cliente.clienteId)

    this.pedidoService.buscarPedidos(this.clienteId)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(pedidos => this.pedidos = pedidos)
  }

}
