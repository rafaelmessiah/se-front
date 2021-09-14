import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'mascaraCartao'
})
export class MascaraCartaoPipe implements PipeTransform {
  transform(numeroCartao: string) {
    return numeroCartao.substring(numeroCartao.length-4)
  }
}
