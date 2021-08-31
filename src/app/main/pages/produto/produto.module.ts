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

const routes: Routes = [
  {
    path:'produtos',
    component:ProdutoComponent,
    data: { animation: 'produtos'},
    children:[
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
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreSidebarModule
  ],
  declarations: [ProdutoComponent,ProdutoListaComponent,ProdutoListaSidebarComponent,ProdutoItemComponent]
})
export class ProdutoModule { }
