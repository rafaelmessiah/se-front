import { Component, OnInit } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { tap, switchMap } from 'rxjs/operators';
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
      headerTitle: 'Meus Pedidos',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
        ]
      }
    }

    this.loginService.clienteLogado$
    .pipe(
      untilDestroyed(this),
      tap(cliente => this.clienteId = cliente.clienteId),
      switchMap(cliente => this.pedidoService.buscarPedidos(cliente.clienteId))
    )
    .subscribe(pedidos => this.pedidos = pedidos)
  }
}
