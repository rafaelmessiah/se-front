import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaModel } from '../../produto/models/categoria.model';
import { ProdutoService } from '../../produto/produto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  host: {class: 'ecommerce-application'}
})
export class CategoriasComponent implements OnInit {

  public categorias: CategoriaModel[]=[]

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.produtoService.buscarCategorias().subscribe(categorias=>{
      this.categorias = categorias;
    })
  }

}
