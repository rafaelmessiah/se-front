import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { CoreSidebarModule } from '@core/components';
import { ProdutoItemComponent } from './produto-lista/produto-item/produto-item.component';
import { CoreCommonModule } from '@core/common.module';
import { ProdutoRankingComponent } from './produto-ranking/produto-ranking.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';



const routes: Routes = [
  {
    path:'',
    component:ProdutoComponent,
    data: { animation: 'produtos'},
    children:[
      {
        path:'',
        component:ProdutoRankingComponent,
        data:{animation: 'produtos-ranking'},
      },
      {
        path:'lista',
        component:ProdutoListaComponent,
        data:{animation: 'produtos-lista'},
        children:[
          {
            path:'',
            component:ProdutoItemComponent,
            data:{animation:'produto-lista-categoriavazia'}
          },
          {
            path:':categoriaId',
            component:ProdutoItemComponent,
            data:{animation:'produto-lista-categoria'}
          }
        ]
      },
      {
        path:'detalhe/:produtoId',
        component:ProdutoDetalheComponent,
        data:{animation: 'produtos-detelhe'},
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule,
    NgbModule,
    NgSelectModule,
  ],
  declarations: [ProdutoComponent,ProdutoListaComponent,ProdutoItemComponent,ProdutoRankingComponent,ProdutoDetalheComponent]
})
export class ProdutoModule { }
