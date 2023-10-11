import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenService } from 'src/app/services';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxTabsModule } from 'devextreme-angular/ui/tabs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { DxTabsTypes } from 'devextreme-angular/ui/tabs';

import { Dates, PanelItem } from 'src/app/types/resource';

@Component({
  selector: 'toolbar-analytics',
  templateUrl: './toolbar-analytics.component.html',
  styleUrls: ['./toolbar-analytics.component.scss']
})

export class ToolbarAnalyticsComponent {
  @Input() selectedItems: Array<number>;

  @Input() titleText: string;

  @Input() panelItems: Array<PanelItem>;

  @Output() selectionChanged = new EventEmitter<Dates>();

  constructor(protected screen: ScreenService) { }

  selectionChange(e: DxTabsTypes.SelectionChangedEvent) {
    const dates = e.addedItems[0].value.split('/');

    this.selectionChanged.emit({ startDate: dates[0], endDate: dates[1] });
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxTabsModule,
    DxToolbarModule
  ],
  declarations: [ToolbarAnalyticsComponent],
  exports: [ToolbarAnalyticsComponent],
})
export class ToolbarAnalyticsModule { }
