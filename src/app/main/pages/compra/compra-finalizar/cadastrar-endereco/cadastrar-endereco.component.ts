import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompraService } from '../../compra.service';
import { EnderecoModel } from '../../models/endereco.model';

@Component({
  selector: 'app-cadastrar-endereco',
  templateUrl: './cadastrar-endereco.component.html',
  styleUrls: ['./cadastrar-endereco.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CadastrarEnderecoComponent implements OnInit {

  clienteId = 1
  formCadastroEndereco: FormGroup

  constructor(private compraService: CompraService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formCadastroEndereco = this.formBuilder.group({
      clienteId:[this.clienteId],
      rua:['',[Validators.required, Validators.maxLength(100)]],
      numero:['', [Validators.required, Validators.maxLength(30)]],
      complemento:['', [Validators.required, Validators.maxLength(30)]],
      cep:['',[Validators.required, Validators.maxLength(8)]]
    })
  }

  onSubmit(){

    if(this.formCadastroEndereco.invalid){
      return;
    }


    this.cadastrarCartao(this.formCadastroEndereco.value)

    console.log(this.formCadastroEndereco.value)
  }

  cadastrarCartao(model: EnderecoModel){
    this.compraService.cadastrarEndereco(model)
    .subscribe()
  }

}
