import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apply',
})
export class ApplyPipeDirective implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, arg1?: any, ...args: any[]): any {
    return typeof value === 'function' ? value(arg1, ...args) :
      value[arg1].apply(value, args);
  }
}
