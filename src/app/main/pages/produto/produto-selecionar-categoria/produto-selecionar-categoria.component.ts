import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../Models/categoria.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-selecionar-categoria',
  templateUrl: './produto-selecionar-categoria.component.html',
  styleUrls: ['./produto-selecionar-categoria.component.scss']
})
export class ProdutoSelecionarCategoriaComponent implements OnInit {

  public categorias: CategoriaModel[]=[]

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.buscarCategorias().subscribe(categorias=>{
      this.categorias = categorias;
    })
  }

}
