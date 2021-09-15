import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompraService } from '../../compra.service';
import { CadastroCartaoModel } from '../../models/cadastro-cartao.model';
import { CartaoDetalheModel } from '../../models/cartao-detalhe.model';

@Component({
  selector: 'app-cadastrar-cartao',
  templateUrl: './cadastrar-cartao.component.html',
  styleUrls: ['./cadastrar-cartao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CadastrarCartaoComponent implements OnInit {

  clienteId = 1
  cadastroCartaoForm: FormGroup;
  cadastroCartaoFormSubmitted: boolean = false

  constructor(private compraService:CompraService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cadastroCartaoForm = this.formBuilder.group({
      clienteId:[this.clienteId],
      numero: ['',[Validators.required, Validators.maxLength(20)]],
      bandeira: ['',[Validators.required, Validators.maxLength(20)]],
      codigoSeguranca: ['',[Validators.required, Validators.maxLength(3)]],
      dataVencimento: ['',[Validators.required]]
    })

  }

  onSubmit(){
    let model:CadastroCartaoModel = this.cadastroCartaoForm.value;
    console.log(model)
    this.cadastrarCartao(model)
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
