import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { coreConfig } from '../../../app-config';
import { CoreConfigService } from '../../../../@core/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginModel } from './models/login.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {class: 'ecommerce-application'}
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup

  constructor(
    private coreConfigService: CoreConfigService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
                
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
   }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      senha: ['',[Validators.required]]
    })
  }

  onSubmit(){
   if(this.formLogin.invalid){
     return;
   }

   this.login(this.formLogin.value)
  }

  login(model: LoginModel){
    this.loginService.login(model)
    .subscribe(res => this.router.navigate(['/']),
    err => {console.log(err.error)})
  }

  navegar(){
    this.router.navigate(['/cadastar'])
  }

}
