import { NgModule } from '@angular/core';
import { MascaraCartaoPipe } from './mascara-credito.pipe';



@NgModule({
  imports: [],
  declarations:[MascaraCartaoPipe],
  exports:[MascaraCartaoPipe]
})
export class CustomPipesModule { }
