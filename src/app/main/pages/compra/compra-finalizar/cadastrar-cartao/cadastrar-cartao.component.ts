import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompraService } from '../../compra.service';

@Component({
  selector: 'app-cadastrar-cartao',
  templateUrl: './cadastrar-cartao.component.html',
  styleUrls: ['./cadastrar-cartao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CadastrarCartaoComponent implements OnInit {

  cadastroCartaoForm: FormGroup

  constructor(private service:CompraService) { }

  ngOnInit() {
    this.cadastroCartaoForm = new FormGroup({
      'numero': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'bandeira': new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      'codigoSeguranca': new FormControl(null, [Validators.required, Validators.maxLength(3)]),
      'dataVencimento': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    console.log('bazinga')
  }


}
