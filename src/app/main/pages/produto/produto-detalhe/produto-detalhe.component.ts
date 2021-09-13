import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CarrinhoService } from '../../carrinho/carrinho.service';
import { SalvarModel } from '../../carrinho/models/salvar.model';
import { ProdutoDetalhadoModel } from '../Models/produto-detalhe.model';
import { ProdutoService } from '../produto.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutoDetalheComponent implements OnInit {

  produto: ProdutoDetalhadoModel
  produtoId: number
  clienteId: number = 1
  qtde: number = 1
  inseriu: boolean = false
  inserido: boolean = false
  

  constructor(private produtoService: ProdutoService, 
              private carrinhoService: CarrinhoService,
              private toastrService: ToastrService, 
              private route: ActivatedRoute) { }

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
    this.carrinhoService.inserir({
      produtoId : this.produto.produtoId, 
      clienteId : this.clienteId,
      qtde : this.qtde 
    })
    .subscribe(
      () => {
      this.inseriu = true
    },
      () => {
        this.inserido = true
      }
    )
  }

  alterarQtde(novaQtde) {
    this.qtde = novaQtde;
  }

  toastInseriu(){
    this.toastrService.success('Inserido', 'O produto foi inserido no Carrinho', {
      timeOut: 3000,
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
  }
    
  

}
