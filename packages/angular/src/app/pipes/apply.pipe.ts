import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apply',
})
export class ApplyPipe implements PipeTransform {
  transform(value: (...args: any[]) => any, ...args: any[]): any {
    return value(...args);
  }
}

@NgModule({
  imports: [],
  providers: [],
  exports: [ApplyPipe],
  declarations: [ApplyPipe],
})
export class ApplyPipeModule { }
