import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CarrinhoService } from '../../carrinho/carrinho.service';
import { SalvarModel } from '../../carrinho/models/salvar.model';
import { ProdutoDetalhadoModel } from '../models/produto-detalhe.model';
import { ProdutoService } from '../produto.service';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../cliente/cliente.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginService } from '../../login/login.service';
import { map, switchMap, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutoDetalheComponent implements OnInit {

  clienteId: number
  produto: ProdutoDetalhadoModel
  produtoId: number
  qtde: number = 1
  inserido: boolean = false
  
  constructor(private produtoService: ProdutoService, 
              private carrinhoService: CarrinhoService,
              private route: ActivatedRoute,
              private loginService: LoginService) { }

  ngOnInit() {
    //Busca o cliente e o Carrinho com Base no Behavior Subject do Login
    this.loginService.clienteLogado$
    .pipe(
      untilDestroyed(this),
      tap(cliente => this.clienteId = cliente.clienteId),
    )
    .subscribe()

    this.route.params
    .pipe(
      untilDestroyed(this),
      map((params: Params) => this.produtoId = +params['produtoId']),
      switchMap(produtoId => this.produtoService.obter(produtoId))
    )
    .subscribe(produto => this.produto = produto)

    //Verifica
    this.carrinhoService.itensCarrinho$
    .pipe(
      map(produtos => produtos.some(a => a.produtoId == this.produtoId))
    )
    .subscribe(isInserido => this.inserido = isInserido)
  }

  inserir(){
    this.carrinhoService.inserir({
      produtoId: this.produto.produtoId,
      clienteId: this.clienteId,
      qtde: this.qtde
    })
    .pipe(
      untilDestroyed(this)
    )
    .subscribe()
  }

  alterarQtde(novaQtde) {
    this.qtde = novaQtde;
  }
}
