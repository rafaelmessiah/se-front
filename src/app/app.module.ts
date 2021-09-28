import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AuthGuard } from './autenticacao/auth.guard';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/produto',
    pathMatch: 'full'
  },
  {
    path: 'miscellaneous',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/pages/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule)
  },
  {
    path: 'produto',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/pages/produto/produto.module').then(m => m.ProdutoModule)
  },
  {
    path: 'carrinho',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/pages/carrinho/carrinho.module').then(m => m.CarrinhoModule)
  },
  {
    path: 'compra',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/pages/compra/compra.module').then(m => m.CompraModule)
  },
  {
    path: 'pedido',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/pages/pedido/pedido.module').then(m => m.PedidoModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./main/pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'authentication',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '**',
    redirectTo: '/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
