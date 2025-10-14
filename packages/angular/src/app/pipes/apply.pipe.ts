import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apply',
})
export class ApplyPipeDirective implements PipeTransform {
  transform(value: Object | ((...args: any[]) => any), arg1, ...args: any[]): any {
   return typeof value === 'function' ? value(arg1, ...args) :
    value[arg1].apply(value, args);
  }
}
