import {
 Component, Input, NgModule, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from 'src/app/shared/types/contact';

@Component({
  selector: 'contact-status',
  templateUrl: './contact-status.component.html',
  styleUrls: ['./contact-status.component.scss'],
})
export class ContactStatusComponent implements OnInit {
  @Input() value: ContactStatus;

  @Input() input?: boolean;

  constructor() {
    this.input = !!this.input;
  }

  ngOnInit() { }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ContactStatusComponent],
  exports: [ContactStatusComponent],
})
export class ContactStatusModule { }
