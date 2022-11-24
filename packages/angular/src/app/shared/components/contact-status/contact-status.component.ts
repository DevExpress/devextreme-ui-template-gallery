import {
  Component, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from 'src/app/shared/types/contact';

@Component({
  selector: 'contact-status',
  template: `
  <span
    class="status status-{{ value | lowercase }} {{showText ? 'status-text' : ''}}"
  >
    {{ showText ? value : '' }}
  </span>
`,
  styleUrls: ['./contact-status.component.scss'],
})
export class ContactStatusComponent {
  @Input() value: ContactStatus;

  @Input() showText = true;
}

@NgModule({
  imports: [CommonModule],
  declarations: [ContactStatusComponent],
  exports: [ContactStatusComponent],
})
export class ContactStatusModule { }
