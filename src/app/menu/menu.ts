import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'Home',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url: '/produto',
    exactMatch: true
  }, 
  {
    id: 'produto',
    title: 'Produtos',
    type: 'item',
    icon: 'shopping-bag',
    url: '/produto/lista'
  },
 ]
