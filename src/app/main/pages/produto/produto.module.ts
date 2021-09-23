import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoComponent } from './produto.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { CoreSidebarModule } from '@core/components';
import { CoreCommonModule } from '@core/common.module';
import { ProdutoRankingComponent } from './produto-ranking/produto-ranking.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProdutoService } from './produto.service';
import { CarrinhoService } from '../carrinho/carrinho.service';


const routes: Routes = [
  {
    path:'',
    component:ProdutoComponent,
    data: { animation: 'produtos'},
    children:[
      {
        path:'',
        component:ProdutoRankingComponent,
      },
      {
        path:'lista',
        component:ProdutoListaComponent,
        data:{animation: 'produtos-lista'},
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
    CoreTouchspinModule,
    CoreCommonModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgxNumberSpinnerModule,
    SweetAlert2Module.forRoot()
  ],
  declarations: [ProdutoComponent,ProdutoListaComponent,ProdutoRankingComponent,ProdutoDetalheComponent],
  providers:[ProdutoService, CarrinhoService]
})
export class ProdutoModule { }
