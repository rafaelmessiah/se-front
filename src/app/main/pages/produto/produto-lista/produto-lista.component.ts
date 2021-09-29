import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoriaModel } from '../models/categoria.model';
import { ProdutoSimplesModel } from '../models/produto-simples.model';
import { ProdutoService } from '../produto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {

  public categorias: CategoriaModel[] = [];
  public produtos: ProdutoSimplesModel[] = [];
  formCategoria: FormGroup
  
  constructor(private produtoService: ProdutoService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    /**
     * Inicializa o Formulario
    */
    this.formCategoria = this.formBuilder.group({
      categoria:[0,[Validators.required]]
    })

    //Busca as categorias do banco
    this.produtoService.buscarCategorias()
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(categorias=>{
      this.categorias = categorias;
    })

    this.produtoService.buscarTodos()
    .subscribe(produtos => this.produtos = produtos)

    console.log(this.formCategoria.get('categoria').value)
  }
   
  onSelect(categoriaId: number){

    if(categoriaId == 0){
      this.produtoService.buscarTodos()
      .subscribe(produtos => this.produtos = produtos)
    }
    else{
      this.produtoService.buscarProdutos(categoriaId)
      .subscribe(produtos => this.produtos = produtos)
    }
  }
}
