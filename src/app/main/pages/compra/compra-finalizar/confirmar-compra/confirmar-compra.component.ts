import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IniciarModel } from '../../models/iniciar.model';
import { CompraService } from '../../compra.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmarCompraComponent implements OnInit {

  @Input() compraModel: IniciarModel
  @Input() modal: NgbActiveModal
  confirmada : boolean

  constructor(private compraService: CompraService, 
              private router: Router) { }

  ngOnInit() {
    console.log(this.compraModel)
  }

  cadastrarCompra(){
    this.compraService.cadastrarCompra(this.compraModel)
    .pipe(
      untilDestroyed(this)
    )
    .subscribe(() =>{
      this.confirmada = true
    },err => {
      console.log(err)
    })
  }

  redirecionar(){
    this.modal.close(),
    this.router.navigate(['/produto'])
  }

}
