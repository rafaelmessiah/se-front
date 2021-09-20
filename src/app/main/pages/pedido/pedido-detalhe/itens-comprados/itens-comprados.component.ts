import { Component, Input, OnInit } from '@angular/core';
import { ItemProdutoCompraModel } from '../../models/item-produto-compra.model';

@Component({
  selector: 'app-itens-comprados',
  templateUrl: './itens-comprados.component.html',
  styleUrls: ['./itens-comprados.component.scss']
})
export class ItensCompradosComponent implements OnInit {

  @Input() itensComprados: ItemProdutoCompraModel[]
  
  constructor() { }

  ngOnInit() {

  }

}
