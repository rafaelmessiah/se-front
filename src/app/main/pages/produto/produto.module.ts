import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { CoreSidebarComponent } from '@core/components/core-sidebar/core-sidebar.component';
import { CoreSidebarModule } from '@core/components';
import { ProdutoListaSidebarComponent } from './produto-lista/sidebar/sidebar.component';

const routes: Routes = [
  {
    path:'produtos',
    component:ProdutoComponent,
    data: { animation: 'produtos'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreSidebarModule
  ],
  declarations: [ProdutoComponent, ProdutoListaComponent,ProdutoListaSidebarComponent]
})
export class ProdutoModule { }
