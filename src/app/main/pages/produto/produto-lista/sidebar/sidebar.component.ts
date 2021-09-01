import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from '../../Models/categoria.model';
import { ProdutoService } from '../../produto.service';

@Component({
  selector: 'produto-lista-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../produto-lista.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProdutoListaSidebarComponent implements OnInit {
  
  public categorias: CategoriaModel[] =[];
  public isOnPage: boolean

  constructor(private produtoService: ProdutoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.produtoService.buscarCategorias().subscribe(categorias=>{
      this.categorias = categorias;
    })

  }

  onSelect(id: number){
    this.router.navigate([id], {relativeTo: this.route});
    console.log
  }
}
