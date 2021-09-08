import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ItemCarrinhoModel } from '../models/item-carrinho.model';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-carrinho-item',
  templateUrl: './carrinho-item.component.html',
  styleUrls: ['../carrinho.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarrinhoItemComponent implements OnInit {

  @Input() item: ItemCarrinhoModel;
  @Output() itemChange = new EventEmitter<number>();
  clienteId = 1;

  constructor(private carrinhoService :CarrinhoService) { }

  ngOnInit() {
    
  }

  removerItem(){
    this.carrinhoService.remover(this.item.carrinhoId, this.clienteId).subscribe(respota=>{
      console.log(respota);
    })
  }

  alterarQtde(model: {produto}){
    console.log(this.item.qtde)
  }
}
