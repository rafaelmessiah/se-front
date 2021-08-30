import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./produto.component.scss'],
  host: {class: 'ecommerce-application'}
})
export class ProdutoComponent implements OnInit {

  public contentHeader: object

  constructor() { }

  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Sample',
            isLink: false
          }
        ]
      }
    }
  }

}
