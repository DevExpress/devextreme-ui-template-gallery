import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string): unknown {
    return value.replace(/(\d{3})(\d{3})(\d+)/, '+1($1)$2-$3');
  }
}

@NgModule({
  imports: [],
  providers: [],
  exports: [PhonePipe],
  declarations: [PhonePipe],
})
export class PhonePipeModule { }
