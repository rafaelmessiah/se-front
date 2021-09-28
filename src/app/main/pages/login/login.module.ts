import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

const routes: Routes =[
  {
    path:'',
    component: LoginComponent,
    data:{animation:'login'}
  },
  {
    path:'cadastrar',
    component: CadastrarComponent,
    data:{animation:'cadastrar'}
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ContentHeaderModule,
    CoreCommonModule,
    NgbModule,
  ],
  declarations: [LoginComponent, CadastrarComponent]
})
export class LoginModule { }
