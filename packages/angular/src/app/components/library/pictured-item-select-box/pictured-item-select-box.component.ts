import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule } from 'devextreme-angular';

@Component({
  selector: 'pictured-item-select-box',
  templateUrl: 'pictured-item-select-box.component.html',
  styleUrls: ['./pictured-item-select-box.component.scss'],
  imports: [
    DxSelectBoxModule,
    CommonModule,
  ],
})
export class PicturedItemSelectBoxComponent {
  @Input() value: string | Record<string, unknown>;

  @Input() label = '';

  @Input() items: Record<string, unknown>[] = [];

  @Output() valueChange = new EventEmitter<string>();

  displayExprFn = (data?: Record<string, unknown> | string) => {
    if(!data) return '';

    return typeof data === 'string' ? data : String(data.name ?? '');
  };
}
