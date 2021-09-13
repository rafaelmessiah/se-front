import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes =[
  {
    path:'',
    component: ClienteComponent,
    data: { animation: 'compra'},
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
  declarations: [ClienteComponent]
})
export class ClienteModule { }
