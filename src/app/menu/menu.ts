import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url:'/home'
  },
  {
    id: 'produto',
    title: 'Produtos',
    type: 'collapsible',
    icon: 'shopping-bag',
    children:[
      {
        id: 'categorias',
        title: 'Categorias',
        type: 'item',
        icon: 'circle',
        url: '/produto/categoria'
      }
    ]
  },
 ]
