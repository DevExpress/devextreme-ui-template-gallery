import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { forkJoin, Subscription } from 'rxjs';

import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxFunnelModule } from 'devextreme-angular/ui/funnel';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { DxSplitterModule } from 'devextreme-angular/ui/splitter';

import { DataService, ScreenService } from 'src/app/services';
import { ToolbarAnalyticsComponent } from 'src/app/components/utils/toolbar-analytics/toolbar-analytics.component';
import { ConversionCardComponent } from 'src/app/components/utils/conversion-card/conversion-card.component';
import { RevenueCardComponent } from 'src/app/components/utils/revenue-card/revenue-card.component';
import { RevenueAnalysisCardComponent } from 'src/app/components/utils/revenue-analysis-card/revenue-analysis-card.component';
import { RevenueSnapshotCardComponent } from 'src/app/components/utils/revenue-snapshot-card/revenue-snapshot-card.component';
import { OpportunitiesTickerComponent } from 'src/app/components/utils/opportunities-ticker/opportunities-ticker.component';
import { RevenueTotalTickerComponent } from 'src/app/components/utils/revenue-total-ticker/revenue-total-ticker.component';
import { ConversionTickerComponent } from 'src/app/components/utils/conversion-ticker/conversion-ticker.component';
import { LeadsTickerComponent } from 'src/app/components/utils/leads-ticker/leads-ticker.component';
import { analyticsPanelItems, Dates } from 'src/app/types/resource';
import {
  Sales,
  SalesByState,
  SalesByStateAndCity,
  SalesOrOpportunitiesByCategory,
} from 'src/app/types/analytics';
import { ChatAssistantService } from 'src/app/components/library/chat-assistant/chat-assistant.service';
import { ChatCardComponent } from 'src/app/components/utils/chat-card-component/chat-card-component.component';
import { ChatFloatingButtonComponent } from 'src/app/components/utils/chat-floating-button/chat-floating-button.component';
import { ChatPopupComponent } from 'src/app/components/utils/chat-popup/chat-popup.component';

@Component({
  templateUrl: './analytics-dashboard.component.html',
  styleUrls: ['./analytics-dashboard.component.scss'],
  providers: [DataService, ChatAssistantService],
  imports: [
    DxScrollViewModule,
    DxDataGridModule,
    DxBulletModule,
    DxFunnelModule,
    DxPieChartModule,
    DxChartModule,
    DxSplitterModule,
    ToolbarAnalyticsComponent,
    DxLoadPanelModule,
    ConversionCardComponent,
    RevenueAnalysisCardComponent,
    RevenueCardComponent,
    RevenueSnapshotCardComponent,
    OpportunitiesTickerComponent,
    RevenueTotalTickerComponent,
    ConversionTickerComponent,
    LeadsTickerComponent,
    ChatCardComponent,
    ChatFloatingButtonComponent,
    ChatPopupComponent,
    CommonModule,
  ],
})
export class AnalyticsDashboardComponent implements OnInit, OnDestroy {
  private service = inject(DataService);

  protected chat = inject(ChatAssistantService);

  private screen = inject(ScreenService);

  isLarge = signal(this.screen.sizes['screen-large']);

  private screenSubscription: Subscription = this.screen.screenChanged.subscribe(
    ({ isLarge, isXLarge }) => {
      this.isLarge.set(isLarge || isXLarge);

      if (!this.isLarge() && this.chat.isPinned) {
        this.chat.unpinChat();
      }
    }
  );

  analyticsPanelItems = analyticsPanelItems;

  opportunities = signal<SalesOrOpportunitiesByCategory | null>(null);

  sales = signal<Sales | null>(null);

  salesByState = signal<SalesByState | null>(null);

  salesByCategory = signal<SalesOrOpportunitiesByCategory | null>(null);

  isLoading = signal(true);

  usesSplitterLayout = computed(() => this.chat.isPinned && this.isLarge());

  selectionChange(dates: Dates) {
    this.loadData(dates.startDate, dates.endDate);
  }

  loadData = (startDate: string, endDate: string) => {
    this.isLoading.set(true);

    forkJoin({
      opportunities: this.service.getOpportunitiesByCategory(startDate, endDate),
      sales: this.service.getSales(startDate, endDate),
      salesByCategory: this.service.getSalesByCategory(startDate, endDate),
      salesByState: this.service
        .getSalesByStateAndCity(startDate, endDate)
        .pipe(map((data) => this.service.getSalesByState(data as SalesByStateAndCity))),
    }).subscribe((data) => {
      this.opportunities.set(data.opportunities);
      this.sales.set(data.sales as Sales);
      this.salesByCategory.set(data.salesByCategory);
      this.salesByState.set(data.salesByState);
      this.isLoading.set(false);
    });
  };

  ngOnInit(): void {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');

    this.loadData(startDate, endDate);
  }

  ngOnDestroy(): void {
    this.screenSubscription.unsubscribe();
  }
}
