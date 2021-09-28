import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompraService } from '../../compra.service';
import { CadastroCartaoModel } from '../../models/cadastro-cartao.model';
import { CartaoDetalheModel } from '../../models/cartao-detalhe.model';
import { ClienteService } from '../../../cliente/cliente.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginService } from 'app/main/pages/login/login.service';

@UntilDestroy()
@Component({
  selector: 'app-cadastrar-cartao',
  templateUrl: './cadastrar-cartao.component.html',
  styleUrls: ['./cadastrar-cartao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CadastrarCartaoComponent implements OnInit {

  @Input() modal: NgbActiveModal
  formCadastroCartao: FormGroup;
  clienteId: number

  constructor(private compraService:CompraService,
              private formBuilder: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit() {

    //Pega o clienteId do LoginService
    this.loginService.clienteLogado$
    .subscribe(cliente => this.clienteId = cliente.clienteId)
    
    //Inicializa o formulario
    this.formCadastroCartao = this.formBuilder.group({
      clienteId:[this.clienteId],
      numero: ['',[Validators.required, Validators.minLength(16),Validators.maxLength(16)]],
      bandeira: ['',[Validators.required, Validators.maxLength(20)]],
      codigoSeguranca: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      dataVencimento: ['',[Validators.required]]
    })

  }

  onSubmit(){
    if(this.formCadastroCartao.invalid){
      return;
    }

    this.cadastrarCartao(this.formCadastroCartao.value)
  }

  cadastrarCartao(model: CadastroCartaoModel){
    this.compraService.cadastrarCartao(model)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(res => {
      this.modal.close(),
      err => {
        console.log(err)
      }
    })
  }

}
