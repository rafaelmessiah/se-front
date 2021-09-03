import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CoreCommonModule } from '../../../../@core/common.module';
import { Routes, RouterModule } from '@angular/router';
import { ContentHeader } from '../../../layout/components/content-header/content-header.component';
import { ContentHeaderModule } from '../../../layout/components/content-header/content-header.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProdutoSliderComponent } from './produto-slider/produto-slider.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'home' }
  }
]

@NgModule({
  imports: [
    CommonModule,
    CoreCommonModule,
    RouterModule.forChild(routes),
    ContentHeaderModule
  ],
  declarations: [HomeComponent, CategoriasComponent, ProdutoSliderComponent]
})
export class HomeModule { }
