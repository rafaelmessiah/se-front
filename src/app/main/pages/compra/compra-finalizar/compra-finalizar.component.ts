import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, switchMap, map } from 'rxjs/operators';
import { CarrinhoService } from '../../carrinho/carrinho.service';
import { ItemCarrinhoModel } from '../../carrinho/models/item-carrinho.model';

import { CompraService } from '../compra.service';
import { CartaoDetalheModel } from '../models/cartao-detalhe.model';
import { FormaPagamentoModel } from '../models/forma-pagamento.model';
import { IniciarModel } from '../models/iniciar.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../cliente/cliente.service';
import { EnderecoModel } from '../models/endereco.model';
import { LoginService } from '../../login/login.service';
import { pipe } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-compra-finalizar',
  templateUrl: './compra-finalizar.component.html',
  styleUrls: ['./compra-finalizar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {class: 'ecommerce-application'}
})
export class CompraFinalizarComponent implements OnInit {

  contentHeader: object
  clienteId: number
  itens: ItemCarrinhoModel[] =[]
  valorTotal: number
  valorFrete: number
  formasPagamento: FormaPagamentoModel[]=[]
  enderecos: EnderecoModel[] = []
  cartoes: CartaoDetalheModel[] = []
  iniciarCompraForm: FormGroup
  iniciarCompra: IniciarModel
  isCartao: boolean
  modalRef: NgbActiveModal

  constructor(private carrinhoService: CarrinhoService,
              private compraService: CompraService,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              public modalService: NgbModal
              ) { }

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

    //Metodos relacionados aos itens do carrinho----------------------------------------------------------
    this.carrinhoService.itensCarrinho$
    .pipe(
      untilDestroyed(this),
      tap(itens => this.itens = itens),
      map(itens => 
        itens.reduce((a, b) => a += b.preco * b.qtde, 0.00)
      )
    )
    .subscribe(valor => this.valorTotal = valor)

    //Pega o clienteId do LoginService
    this.loginService.clienteLogado$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(cliente => this.clienteId = cliente.clienteId)

    /*
      Inicializa o Formul??rio
    */
    this.iniciarCompraForm = this.formBuilder.group({
      clienteId:[this.clienteId],
      enderecoId:[null, Validators.required],
      formaPagamentoEnum:[1,Validators.required],
      cartaoCreditoId:[null]
    });

    //Metodos Relacionados ao Cart??o de Credito
    this.compraService.buscarCartoes(this.clienteId)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe()

    this.compraService.cartoes$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(cartoes => this.cartoes = cartoes);
      
    //Metodos relacionados a compra--------------------------------------------------------------------------
    this.compraService.buscarFormaPagamento()
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(formas => 
      this.formasPagamento = formas
    );
        
    //  Metodos Relacionados aos Endere??os
    this.compraService.buscarEnderecos(this.clienteId)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe()

    this.compraService.enderecos$
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(enderecos =>
      this.enderecos = enderecos  
    );
  }

  onSubmit(modalBasic){
    if(this.iniciarCompraForm.invalid){
      return;
    }
    
    this.iniciarCompra = {
      clienteId: this.iniciarCompraForm.controls['clienteId'].value,
      enderecoId: this.iniciarCompraForm.controls['enderecoId'].value,
      formaPagamentoEnum: +this.iniciarCompraForm.controls['formaPagamentoEnum'].value,
      cartaoCreditoId: this.iniciarCompraForm.controls['cartaoCreditoId'].value
    }
    
    this.modalOpen(modalBasic);
  }
          
  ativarCartao(formaPagamento){
    if(formaPagamento == 3){
      this.isCartao = true
    }
    else{
      this.isCartao = false
    }
  }
          
  modalOpen(modalBasic) {
    this.modalRef = this.modalService.open(modalBasic ,
    {
      centered:true,
      backdrop:false
    });
  }

}


