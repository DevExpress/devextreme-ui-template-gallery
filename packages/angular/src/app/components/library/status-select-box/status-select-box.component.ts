import {
  Component, EventEmitter, inject, Input, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { EditorStyle, LabelMode } from 'devextreme-angular/common';
import { contactStatusList } from 'src/app/types/contact';
import { ContactStatusModule } from 'src/app/components/utils/contact-status/contact-status.component';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
    selector: 'status-select-box',
    templateUrl: 'status-select-box.component.html',
    styleUrls: ['./status-select-box.component.scss'],
    imports: [
      DxSelectBoxModule,
      DxTextBoxModule,
      ContactStatusModule,
      CommonModule
    ],
})
export class StatusSelectBoxComponent {
  @Input() value: string;

  @Input() label = '';

  @Input() items = contactStatusList;

  @Input() readOnly = false;

  @Input() stylingMode: EditorStyle = 'filled';

  @Input() labelMode: LabelMode;

  @Input() classList: string;

  @Output() valueChange = new EventEmitter<string>();

  private theme = inject(ThemeService);

  constructor() {
    if(this.theme.isFluent()) {
      this.labelMode = 'outside';
    }
  }
}

