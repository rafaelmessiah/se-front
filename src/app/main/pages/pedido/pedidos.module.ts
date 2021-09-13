import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';

const routes: Routes =[
  {
    path:'',
    component:PedidosComponent,
    data: {animation: 'pedido'},
    children:[
      {
        path:'lista',
        component:PedidoListaComponent,
        data:{animation:'pedido-lista'}
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    NgbModule,
  ],
  declarations: [PedidosComponent]
})
export class PedidosModule { }
