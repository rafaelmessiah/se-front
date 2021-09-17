import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IniciarModel } from '../../models/iniciar.model';
import { CompraService } from '../../compra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmarCompraComponent implements OnInit {

  @Input() compraModel: IniciarModel

  constructor(private compraService: CompraService, 
              private router: Router) { }

  ngOnInit() {
    console.log(this.compraModel)
  }

  cadastrarCompra(){
    this.compraService.cadastrarCompra(this.compraModel)
    .subscribe(() =>{
      this.router.navigate(['/produto'])
    },err => {
      console.log(err)
    })
  }

}
