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
import { DashboardContext } from 'src/app/components/library/chat-assistant/dashboard-ai.service';
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

  private periodName = analyticsPanelItems[4].text;

  private dateRange = analyticsPanelItems[4].value.split('/');

  selectionChange(dates: Dates) {
    const item = analyticsPanelItems.find(
      (p) => p.value === `${dates.startDate}/${dates.endDate}`,
    );
    if (item) {
      this.periodName = item.text;
    }
    this.dateRange = [dates.startDate, dates.endDate];
    this.loadData(dates.startDate, dates.endDate);
  }

  loadData = (startDate: string, endDate: string) => {
    this.isLoading = true;
    const tasks: Observable<object>[] = [
      ['opportunities', this.service.getOpportunitiesByCategory],
      ['sales', this.service.getSales],
      ['salesByCategory', this.service.getSalesByCategory],
      ['salesByState', (startDate: string, endDate: string) => this.service.getSalesByStateAndCity(startDate, endDate).pipe(
        map((data) => this.service.getSalesByState(data))
      )
      ]
    ].map(([dataName, loader]: [string, DataLoader]) => {
      const loaderObservable = loader(startDate, endDate).pipe(share());

      loaderObservable.subscribe((result: DashboardData) => {
        this[dataName] = result;
      });

      return loaderObservable;
    });

    forkJoin(tasks).subscribe(() => {
      this.isLoading = false;
      this.updateDashboardContext();
    });
  }

  ngOnInit(): void {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');

    this.loadData(startDate, endDate);
  }

  ngOnDestroy(): void {
    this.screenSubscription.unsubscribe();
  }

  get usesSplitterLayout() {
    return this.chat.isPinned && this.isLarge;
  }

  private updateDashboardContext() {
    const salesTotal = this.sales
      ? this.sales.reduce((sum, s) => sum + s.total, 0) : 0;
    const opportunitiesTotal = this.opportunities
      ? this.opportunities.reduce((sum, o) => sum + o.value, 0) : 0;

    this.chat.context = {
      periodName: this.periodName,
      dateRange: this.dateRange,
      salesTotal,
      opportunitiesTotal,
      sales: this.sales ?? [],
      opportunities: this.opportunities ?? [],
      salesByCategory: this.salesByCategory
        ? this.salesByCategory.map((s) => ({ name: s.stateName, value: s.total }))
        : [],
      salesByState: this.salesByState ?? [],
      conversionRate: 16,
      leads: 51,
    } as DashboardContext;
  }
}
