import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonComponent } from "devextreme-angular";
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { type DxTabsTypes } from 'devextreme-angular/ui/tabs';

import { ScreenService } from 'src/app/services';
import { Dates, PanelItem } from 'src/app/types/resource';

@Component({
  selector: 'toolbar-analytics',
  templateUrl: './toolbar-analytics.component.html',
  styleUrls: ['./toolbar-analytics.component.scss'],
  imports: [
    CommonModule,
    DxButtonComponent,
    DxTabsModule,
    DxToolbarModule
  ],
})

export class ToolbarAnalyticsComponent {
  @Input() selectedItems: Array<number>;

  @Input() titleText: string;

  @Input() panelItems: Array<PanelItem>;

  @Output() selectionChanged = new EventEmitter<Dates>();

  protected screen = inject(ScreenService);

  selectionChange(e: DxTabsTypes.SelectionChangedEvent) {
    const dates = e.addedItems[0].value.split('/');

    this.selectionChanged.emit({ startDate: dates[0], endDate: dates[1] });
  }
}
