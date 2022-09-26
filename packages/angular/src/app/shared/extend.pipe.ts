import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extend',
})
export class ExtendPipe implements PipeTransform {
  transform(value: Record<string, unknown>, arg: Record<string, unknown>): unknown {
    return { ...value, ...arg };
  }
}

@NgModule({
  imports: [],
  providers: [],
  exports: [ExtendPipe],
  declarations: [ExtendPipe],
})
export class ExtendPipeModule { }
