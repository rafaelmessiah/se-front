import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { LoginService } from '../main/pages/login/login.service';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
 
  constructor(private router: Router, private loginService: LoginService) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.loginService.clienteLogado$.pipe(
       map(cliente => {
           return !!cliente
       }),
       tap(isAuth => {
         if(!isAuth) {
         this.router.navigate(['/login'])
       }})
   )

  }
}
