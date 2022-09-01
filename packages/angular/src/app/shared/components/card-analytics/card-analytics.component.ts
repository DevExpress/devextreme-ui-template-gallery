import { CommonModule } from '@angular/common';
import {
  Component, NgModule, Input, SimpleChanges, OnChanges, OnInit,
} from '@angular/core';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { PositionConfig } from 'devextreme/animation/position';
import { DxButtonModule } from 'devextreme-angular/ui/button';

@Component({
  selector: 'card-analytics',
  templateUrl: './card-analytics.component.html',
  styleUrls: ['./card-analytics.component.scss'],
})
export class CardAnalytticsComponent implements OnChanges, OnInit {
  @Input() title: string;

  @Input() contentClass: string;

  @Input() showData = false;

  isLoading = true;

  position: PositionConfig;

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.showData.currentValue;
  }

  ngOnInit(): void {
    this.position = { of: `.${this.contentClass}` };
  }
}

@NgModule({
  imports: [
    DxLoadPanelModule,
    DxButtonModule,

    CommonModule,
  ],
  declarations: [CardAnalytticsComponent],
  exports: [CardAnalytticsComponent],
})
export class CardAnalyticsModule { }
