import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from '../models/categoria.model';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {

  public categorias: CategoriaModel[] =[];
  

  constructor(private produtoService: ProdutoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.produtoService.buscarCategorias().subscribe(categorias=>{
      this.categorias = categorias;
    })
  }
   
  onSelect(id: number){
    this.router.navigate([id], {relativeTo: this.route});
  }
}
