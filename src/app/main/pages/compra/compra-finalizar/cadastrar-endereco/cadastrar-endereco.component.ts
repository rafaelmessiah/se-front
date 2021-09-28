import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ClienteService } from 'app/main/pages/cliente/cliente.service';
import { CompraService } from '../../compra.service';
import { EnderecoModel } from '../../models/endereco.model';
import { LoginService } from '../../../login/login.service';

@UntilDestroy()
@Component({
  selector: 'app-cadastrar-endereco',
  templateUrl: './cadastrar-endereco.component.html',
  styleUrls: ['./cadastrar-endereco.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CadastrarEnderecoComponent implements OnInit {

  @Input() modal: NgbActiveModal
  formCadastroEndereco: FormGroup
  clienteId: number

  constructor(private compraService: CompraService, 
              private formBuilder: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit() {
    //Pega o clienteId do LoginService
    this.loginService.clienteLogado$
    .subscribe(cliente => this.clienteId = cliente.clienteId)

    //Inicializa o formulario
    this.formCadastroEndereco = this.formBuilder.group({
      clienteId:[this.clienteId],
      rua:['',[Validators.required, Validators.maxLength(100)]],
      numero:['', [Validators.required, Validators.maxLength(30)]],
      complemento:['', [Validators.required, Validators.maxLength(30)]],
      cep:['',[Validators.required, Validators.minLength(8),Validators.maxLength(8)]]
    })
  }

  onSubmit(){
    if(this.formCadastroEndereco.invalid){
      return;
    }

    this.cadastrarEndereco(this.formCadastroEndereco.value)
  }

  cadastrarEndereco(model: EnderecoModel){
    this.compraService.cadastrarEndereco(model)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(res => {
      this.modal.close()
    })
  }

  atualizarCampos(){
    this.compraService.buscarCep(this.formCadastroEndereco.controls['cep'].value)
    .subscribe(endereco => {
      this.formCadastroEndereco.controls['rua'].setValue(endereco.logradouro),
      this.formCadastroEndereco.controls['complemento'].setValue(endereco.complemento)
     })
  }
}
