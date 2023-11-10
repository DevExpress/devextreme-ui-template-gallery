import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { EditorStyle } from 'devextreme-angular/common';
import { contactStatusList } from 'src/app/types/contact';
import { ContactStatusModule } from 'src/app/components/utils/contact-status/contact-status.component';
import { ThemeService } from 'src/app/services/theme.service';

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

  @Input() stylingMode: EditorStyle = 'filled';

  @Input() labelMode: any = this.theme.isFluent() ? 'outside' : undefined;

  @Input() classList;

  @Output() valueChange = new EventEmitter<string>();

  constructor(private theme: ThemeService) {}

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
