import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProdutoSimplesModel } from '../../Models/produto-simples-model';
import { ProdutoService } from '../../produto.service';

@Component({
  selector: 'app-produto-item',
  templateUrl: './produto-item.component.html',
  styleUrls: ['./produto-item.component.scss']
})
export class ProdutoItemComponent implements OnInit {

  public produtos: ProdutoSimplesModel[]= [];
  public categoriaId: number
  teste: number;

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.categoriaId = +params['categoriaId'];
    })

    this.teste = +this.route.snapshot.paramMap.get("categoriaId");
    console.log("teste: " + this.teste);

    this.produtoService.buscar(this.categoriaId).subscribe(produtos=>{
      this.produtos = produtos;
    });

    
    
  }

}
