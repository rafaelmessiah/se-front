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
import { switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutoDetalheComponent implements OnInit {

  produto: ProdutoDetalhadoModel
  produtoId: number
  qtde: number = 1
  inseriu: boolean = false
  inserido: boolean = false
  
  constructor(private produtoService: ProdutoService, 
              private carrinhoService: CarrinhoService,
              private clienteService: ClienteService,
              private route: ActivatedRoute,
              private loginService: LoginService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.produtoId = +params['produtoId']
    })

    this.produtoService.obter(this.produtoId)
    .subscribe(produto=>
      this.produto = produto
    )
  }

  inserir(){
    this.loginService.clienteLogado$
    .pipe(
      untilDestroyed(this),
      switchMap(cliente => this.carrinhoService.inserir({
        produtoId: this.produto.produtoId,
        clienteId: cliente.clienteId,
        qtde: this.qtde
      }))
    ).subscribe(
      res => this.inseriu = true,
      err => this.inserido = true,
    )
  }

  alterarQtde(novaQtde) {
    this.qtde = novaQtde;
  }
}
