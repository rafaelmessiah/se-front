import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './compra.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CompraFinalizarComponent } from './compra-finalizar/compra-finalizar.component';
import { CarrinhoModule } from '../carrinho/carrinho.module';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { CadastrarCartaoComponent } from './compra-finalizar/cadastrar-cartao/cadastrar-cartao.component';
import { CadastrarEnderecoComponent } from './compra-finalizar/cadastrar-endereco/cadastrar-endereco.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarCompraComponent } from './compra-finalizar/confirmar-compra/confirmar-compra.component';
import { CompraService } from './compra.service';

const routes: Routes = [
  {
    path:'',
    component: CompraComponent,
    data: { animation: 'compra'},
    children:[
      {
        path:'finalizar',
        component:CompraFinalizarComponent,
        data: {animation:'compra-finalizar'}
      },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreCommonModule,
    ReactiveFormsModule,
    CarrinhoModule,
    CustomPipesModule,
    NgbModule
  ],
  declarations: [CompraComponent, CompraFinalizarComponent, CompraFinalizarComponent, CadastrarCartaoComponent, CadastrarEnderecoComponent, ConfirmarCompraComponent],
  providers: [CompraService]
})
export class CompraModule { }
