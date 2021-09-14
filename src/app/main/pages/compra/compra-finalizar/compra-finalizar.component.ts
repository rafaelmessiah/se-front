import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CarrinhoService } from '../../carrinho/carrinho.service';
import { ItemCarrinhoModel } from '../../carrinho/models/item-carrinho.model';
import { EnderecoService } from '../../endereco/endereco.service';
import { EnderecoModel } from '../../endereco/models/endereco.model';
import { CompraService } from '../compra.service';
import { CartaoDetalheModel } from '../models/cartao-detalhe.model';
import { FormaPagamentoModel } from '../models/forma-pagamento.model';
import { IniciarModel } from '../models/iniciar.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  clienteId: number = 1
  valorTotal: number
  formasPagamento: FormaPagamentoModel[]=[]
  enderecos: EnderecoModel[] = []
  cartoes: CartaoDetalheModel[] = []
  iniciarCompraForm: FormGroup
  inciarCompra: IniciarModel
  isCartao: boolean
  

  constructor(private carrinhoService: CarrinhoService,
              private compraService: CompraService,
              private enderecoService: EnderecoService,
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

    this.iniciarCompraForm = new FormGroup({
      'endereco': new FormControl(null),
      'formaPagamento': new FormControl('1'),
      'cartao': new FormControl(null)
    })  

    //Metodos relacionados ao carrinho
    this.carrinhoService.buscarItens(this.clienteId).subscribe()
    this.carrinhoService.itensCarrinho$
    .pipe(
      tap(itens => this.valorTotal = this.calcularValorTotal(itens))
    )
    .subscribe(itens => this.itens = itens)

    this.compraService.buscarCartoes(this.clienteId).subscribe()
    this.compraService.cartoes$
    .subscribe(cartoes => this.cartoes = cartoes)
    
    //Metodos relacionados a comp
    this.compraService.buscarFormaPagamento()
    .subscribe(formas => 
      this.formasPagamento = formas
    )

    //Metodos relacionados ao endereco
    this.enderecoService.buscar(this.clienteId).subscribe()
    this.enderecoService.enderecos$
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

  onSubmit(){
    let model = 
    {
      clienteId: this.clienteId, 
      enderecoId: +this.iniciarCompraForm.controls['endereco'].value,
      formaPagamentoEnum: +this.iniciarCompraForm.controls['formaPagamento'].value,
      cartaoCreditoId: this.iniciarCompraForm.controls['cartao'].value
    }
    this.compraService.cadastrar(model)
    .subscribe(resposta =>
      console.log(resposta),
      err =>
      console.log(err)
    )
    
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
    this.modalService.open(modalBasic);
  }



}


