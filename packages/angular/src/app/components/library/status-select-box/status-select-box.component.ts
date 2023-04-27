import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { contactStatusList } from 'src/app/types/contact';
import { ContactStatusModule } from 'src/app/components/utils/contact-status/contact-status.component';

@Component({
  selector: 'status-select-box',
  templateUrl: 'status-select-box.component.html',
  styleUrls: ['./status-select-box.component.scss'],
})
export class StatusSelectBoxComponent {
  @Input() value: string;

  @Input() label = '';

  @Input() items = contactStatusList;

  @Input() readOnly = false;

  @Input() stylingMode = 'outlined';

  @Input() labelMode = 'floating';

  @Output() valueChange = new EventEmitter<string>();
}

@NgModule({
  imports: [
    DxSelectBoxModule,
    DxTextBoxModule,
    ContactStatusModule,
    CommonModule],
  declarations: [StatusSelectBoxComponent],
  exports: [StatusSelectBoxComponent],
})
export class StatusSelectBoxModule {}
