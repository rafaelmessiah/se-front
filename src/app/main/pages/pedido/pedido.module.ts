import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from 'app/custom-pipes/custom-pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from './pedido.service';
import { ItensCompradosComponent } from './pedido-detalhe/itens-comprados/itens-comprados.component';

const routes: Routes = [
  {
    path:'',
    component: PedidoListaComponent,
    data: {animation:'pedido-lista'}
  },
  {
    path:'detalhe/:id',
    component: PedidoDetalheComponent,
    data: {animation:'pedido-detalhe'}
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule,
    CoreCommonModule,
    ReactiveFormsModule,
    CustomPipesModule,
    NgbModule
  ],
  providers:[PedidoService],
  declarations: [PedidoListaComponent, PedidoDetalheComponent, ItensCompradosComponent]
})
export class PedidoModule { }
