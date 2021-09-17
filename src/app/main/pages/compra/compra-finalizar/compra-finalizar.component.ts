import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CarrinhoService } from '../../carrinho/carrinho.service';
import { ItemCarrinhoModel } from '../../carrinho/models/item-carrinho.model';

import { CompraService } from '../compra.service';
import { CartaoDetalheModel } from '../models/cartao-detalhe.model';
import { FormaPagamentoModel } from '../models/forma-pagamento.model';
import { IniciarModel } from '../models/iniciar.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../cliente/cliente.service';
import { EnderecoModel } from '../models/endereco.model';

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
  itens: ItemCarrinhoModel[] =[]
  valorTotal: number
  formasPagamento: FormaPagamentoModel[]=[]
  enderecos: EnderecoModel[] = []
  cartoes: CartaoDetalheModel[] = []
  iniciarCompraForm: FormGroup
  inciarCompra: IniciarModel
  isCartao: boolean
  

  constructor(private carrinhoService: CarrinhoService,
              private compraService: CompraService,
              private clienteService: ClienteService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) { }

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

    
    /*
      Inicializa o Formulário
     */
      this.iniciarCompraForm = this.formBuilder.group({
        clienteId:[this.clienteService.clienteId],
        enderecoId:[null, Validators.required],
        formaPagamentoEnum:[1,Validators.required],
        cartaoCreditoId:[null]
      })

    //Metodos relacionados ao carrinho
    this.carrinhoService.buscarItens(this.clienteService.clienteId).subscribe()
    this.carrinhoService.itensCarrinho$
    .pipe(
      tap(itens => this.valorTotal = this.calcularValorTotal(itens))
    )
    .subscribe(itens => this.itens = itens)

    this.compraService.buscarCartoes(this.clienteService.clienteId).subscribe()
    this.compraService.cartoes$
    .subscribe(cartoes => this.cartoes = cartoes)
    
    //Metodos relacionados a comp
    this.compraService.buscarFormaPagamento()
    .subscribe(formas => 
      this.formasPagamento = formas
    )

    this.compraService.buscarEnderecos(this.clienteService.clienteId).subscribe()
    this.compraService.enderecos$
    .subscribe(enderecos =>
      this.enderecos = enderecos  
    )
  }

  calcularValorTotal(itens: ItemCarrinhoModel[]){
    let valor = 0;
    itens.forEach(element => {
      valor += element.qtde * element.preco
    });
 
    return valor
  }

  onSubmit(modalBasic){
   if(this.iniciarCompraForm.invalid){
     return;
   }

   let model: IniciarModel = {
      clienteId: this.iniciarCompraForm.controls['clienteId'].value,
      enderecoId: this.iniciarCompraForm.controls['enderecoId'].value,
      formaPagamentoEnum: this.iniciarCompraForm.controls['formaPagamentoEnum'].value,
      cartaoCreditoId: this.iniciarCompraForm.controls['cartaoCreditoId'].value
   }
    
   this.compraService.cadastrarCompra(model).subscribe((resposta => console.log(resposta)))
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
    this.modalService.open(modalBasic ,{centered:true});
  }

}


