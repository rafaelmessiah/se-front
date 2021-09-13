import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CarrinhoService } from '../../carrinho/carrinho.service';
import { ItemCarrinhoModel } from '../../carrinho/models/item-carrinho.model';
import { EnderecoService } from '../../endereco/endereco.service';
import { EnderecoModel } from '../../endereco/models/endereco.model';
import { CompraService } from '../compra.service';
import { FormaPagamentoModel } from '../models/forma-pagamento.model';
import { IniciarModel } from '../models/iniciar.model';

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
  iniciarCompraForm: FormGroup
  inciarCompra: IniciarModel

  constructor(private carrinhoService: CarrinhoService,
              private compraService: CompraService,
              private enderecoService: EnderecoService) { }

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
      'formaPagamento': new FormControl('1')
    })  

    //Metodos relacionados ao carrinho
    this.carrinhoService.buscarItens(this.clienteId).subscribe()
    this.carrinhoService.itensCarrinho$
    .pipe(
      tap(itens => this.valorTotal = this.calcularValorTotal(itens))
    )
    .subscribe(itens => this.itens = itens)
    
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
      formaPagamentoEnum: +this.iniciarCompraForm.controls['formaPagamento'].value
    }
    this.compraService.cadastrar(model)
    .subscribe(resposta =>
      console.log(resposta),
      err =>
      console.log(err)
    )
    
  }

}
