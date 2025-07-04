import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { ApplyPipeModule } from 'src/app/pipes/apply.pipe';

@Component({
    selector: 'pictured-item-select-box',
    templateUrl: 'pictured-item-select-box.component.html',
    styleUrls: ['./pictured-item-select-box.component.scss'],
    imports: [
      ApplyPipeModule,
      DxSelectBoxModule,
      DxTextBoxModule,
      CommonModule,
    ],
})
export class PicturedItemSelectBoxComponent {
  @Input() value: Record<string, unknown>;

  @Input() label = '';

  @Input() items: Record<string, unknown>[] = [];

  @Output() valueChange = new EventEmitter<string>();
}
