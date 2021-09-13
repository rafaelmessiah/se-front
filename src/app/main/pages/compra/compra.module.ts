import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './compra.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CompraFinalizarComponent } from './compra-finalizar/compra-finalizar.component';


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
  ],
  declarations: [CompraComponent, CompraFinalizarComponent]
})
export class CompraModule { }
