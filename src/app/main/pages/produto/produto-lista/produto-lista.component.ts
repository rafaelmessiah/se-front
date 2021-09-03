import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProdutoSimplesModel } from '../models/produto-simples.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {

  
  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    
  }

}
