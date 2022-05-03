import {
 Component, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from 'src/app/shared/types/contact';

@Component({
  selector: 'contact-status',
  templateUrl: './contact-status.component.html',
  styleUrls: ['./contact-status.component.scss'],
})
export class ContactStatusComponent {
  @Input() value: ContactStatus;

  @Input() input?: boolean = false;

  constructor() {
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ContactStatusComponent],
  exports: [ContactStatusComponent],
})
export class ContactStatusModule { }
