import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from 'src/app/types/contact';

@Component({
  selector: 'contact-status',
  template: `
    <span class="status status-{{ value | lowercase }}">{{ showText ? value : '' }}</span>
  `,
  styleUrls: ['./contact-status.component.scss'],
  imports: [ CommonModule ],
})
export class ContactStatusComponent {
  @Input() value: ContactStatus;

  @Input() showText = true;
}

