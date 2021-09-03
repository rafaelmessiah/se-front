import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public contentHeader: object

  constructor() { }

  ngOnInit() {
    this.contentHeader = {
      headerTitle: 'Seja Bem-vindo',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Selecionar Categoria',
            isLink: true,
            link: '/'
          },
        ]
      }
    }
  }

}
