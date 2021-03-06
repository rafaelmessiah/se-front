import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoComponent } from './carrinho.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { CarrinhoItemComponent } from './carrinho-item/carrinho-item.component';
import { CoreTouchspinModule } from '../../../../@core/components/core-touchspin/core-touchspin.module';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import { CarrinhoResumoComponent } from './carrinho-resumo/carrinho-resumo.component';
import { AuthGuard } from 'app/autenticacao/auth.guard';


const routes: Routes =[
  {
    path:'',
    component: CarrinhoComponent,
    canActivate: [AuthGuard],
    data:{animation:'carrinho'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreCommonModule,
    NgbModule,
    CoreTouchspinModule,
    NgxNumberSpinnerModule
  ],
  declarations: [CarrinhoComponent,CarrinhoItemComponent,CarrinhoResumoComponent],
  exports:[CarrinhoResumoComponent],
})
export class CarrinhoModule { }
