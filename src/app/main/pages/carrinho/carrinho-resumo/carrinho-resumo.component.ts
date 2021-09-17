import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinhoModel } from '../models/item-carrinho.model';

@Component({
  selector: 'app-carrinho-resumo',
  templateUrl: './carrinho-resumo.component.html',
  styleUrls: ['./carrinho-resumo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarrinhoResumoComponent implements OnInit {

  @Input() itens: ItemCarrinhoModel[]
  @Input() valorTotal: number

  constructor() { }

  ngOnInit() {
    
  }

}
