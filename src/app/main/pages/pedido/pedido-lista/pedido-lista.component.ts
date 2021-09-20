import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../cliente/cliente.service';
import { CompraItemModel } from '../models/compra-item.model';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent implements OnInit {

  contentHeader: object
  pedidos: CompraItemModel[] = []

  constructor(private pedidoService: PedidoService,
              private clienteService: ClienteService) { }

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

    this.pedidoService.buscarPedidos(this.clienteService.clienteId)
    .subscribe(
      pedidos => this.pedidos = pedidos
    )

  }

}
