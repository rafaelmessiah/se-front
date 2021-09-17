import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompraService } from '../../compra.service';
import { CadastroCartaoModel } from '../../models/cadastro-cartao.model';
import { CartaoDetalheModel } from '../../models/cartao-detalhe.model';
import { ClienteService } from '../../../cliente/cliente.service';

@Component({
  selector: 'app-cadastrar-cartao',
  templateUrl: './cadastrar-cartao.component.html',
  styleUrls: ['./cadastrar-cartao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CadastrarCartaoComponent implements OnInit {

  formCadastroCartao: FormGroup;

  constructor(private compraService:CompraService,
              private formBuilder: FormBuilder,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.formCadastroCartao = this.formBuilder.group({
      clienteId:[this.clienteService.clienteId],
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
    .subscribe(res => {
      console.log(res),

      err => {
        console.log(err)
      }
    })
  }

}
