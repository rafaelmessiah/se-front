import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { LoginService } from '../login.service';
import { CadastroClienteModel } from '../models/cadastro-cliente.model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  formCadastro: FormGroup

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
    this.formCadastro = this.formBuilder.group({
      cpf: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['',[Validators.required, Validators.email, Validators.maxLength(100)]],
      senha: ['',[Validators.required, Validators.maxLength(100)]],
      dataNascimento: ['',[Validators.required]],
      telefone: ['',[Validators.required, Validators.maxLength(20)]]
    })
  }

  onSubmit(){
    if(this.formCadastro.invalid){
      return;
    }

    this.cadastrar(this.formCadastro.value)
  }

  cadastrar(model: CadastroClienteModel){
    this.loginService.cadastrar(model)
    .subscribe(res => this.router.navigate(['/']),
    err => {console.log(err.error)})
  }

}
