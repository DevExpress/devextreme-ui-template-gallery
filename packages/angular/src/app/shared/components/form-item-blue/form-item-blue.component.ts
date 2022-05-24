import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'form-item-blue',
  template: `
    <label class="dx-texteditor-label">{{
      label
    }}</label>
    <span class="dx-theme-accent-as-text-color">{{
      value
    }}</span>
  `,
  styles: [`
  :host {
    position: relative;
    display: flex;

    span {
      margin-top: 12px;
    }
  }
  `],
})
export class FormItemBlueComponent {
  @Input() label: string;

  @Input() value: string;
}

@NgModule({
  declarations: [FormItemBlueComponent],
  exports: [FormItemBlueComponent],
})
export class FormItemBlueModule { }
