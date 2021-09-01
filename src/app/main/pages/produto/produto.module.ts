import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { CoreSidebarComponent } from '@core/components/core-sidebar/core-sidebar.component';
import { CoreSidebarModule } from '@core/components';
import { ProdutoListaSidebarComponent } from './produto-lista/sidebar/sidebar.component';
import { ProdutoItemComponent } from './produto-lista/produto-item/produto-item.component';
import { CoreCommonModule } from '@core/common.module';
import { ProdutoSelecionarCategoriaComponent } from './produto-selecionar-categoria/produto-selecionar-categoria.component';

const routes: Routes = [
  {
    path:'',
    component:ProdutoComponent,
    data: { animation: 'produtos'},
    children:[
      {
        path:'categoria',
        component:ProdutoSelecionarCategoriaComponent,
        data: {animation: 'categoria'},
      },
      {
        path:'lista',
        component:ProdutoListaComponent,
        data:{animation: 'produtos-lista'},
        children:[
          {
            path:':categoriaId',
            component:ProdutoItemComponent,
            data:{animation:'produto-lista-categoria'}
          }
        ]
      },
      
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule
  ],
  declarations: [ProdutoComponent,ProdutoListaComponent,ProdutoListaSidebarComponent,ProdutoItemComponent, ProdutoSelecionarCategoriaComponent]
})
export class ProdutoModule { }
