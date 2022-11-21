import {
  Component, OnInit, NgModule,
} from '@angular/core';

import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxRangeSelectorModule } from 'devextreme-angular/ui/range-selector';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';

import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';

import { CommonModule, formatDate } from '@angular/common';
import { DataService } from 'src/app/shared/services';
import { Observable } from 'rxjs';

import { CardAnalyticsModule } from 'src/app/shared/components/card-analytics/card-analytics.component';
import { ToolbarAnalyticsModule } from 'src/app/shared/components/toolbar-analytics/toolbar-analytics.component';

import { analyticsPanelItems } from 'src/app/shared/types/resource';

import { Sales, SalesByState, SalesByStateAndCity, SalesOrOpportunitiesByCategory } from 'src/app/shared/types/analytics';
import { DxLoadPanelModule } from "devextreme-angular/ui/load-panel";
import { ApplyPipeModule } from "../../shared/apply.pipe";

type DashboardData = SalesOrOpportunitiesByCategory | Sales | SalesByState | SalesByStateAndCity | null;

@Component({
  templateUrl: './analytics-sales-report.component.html',
  styleUrls: ['./analytics-sales-report.component.scss'],
  providers: [DataService],
})
export class AnalyticsSalesReportComponent implements OnInit {
  groupByPeriods = ['Day', 'Month'];

  sales: Sales = null;
  salesByCategory: SalesOrOpportunitiesByCategory = null;
  salesByDateAndCategory: SalesOrOpportunitiesByCategory = null;

  visualRange: unknown = {};

  constructor(private service: DataService) { }

  selectionChange({item: period}: SelectionChangedEvent) {
    this.service.getSalesByOrderDate(period.toLowerCase())
      .subscribe((data) => {
        this.salesByDateAndCategory = data;
      })
  }

  onRangeChanged = ({value: dates}) => {
    const [startDate, endDate] = dates.map((date) => formatDate(date, 'YYYY-MM-dd', 'en'));

    this.service.getSalesByCategory(startDate, endDate).subscribe((data) => {
      this.salesByCategory = data;
          });
  };

  customizeSaleText(arg: { percentText: string }) {
    return arg.percentText;
  }

  loadData = (groupBy: string) => {
    const [startDate, endDate] = analyticsPanelItems[4].value.split('/');
    [
      ['sales', this.service.getSales(startDate, endDate)],
      ['salesByDateAndCategory', this.service.getSalesByOrderDate(groupBy)],
    ].forEach(([dataName, loader]: [string, Observable<any>]) => {
        this[dataName] = null;
        loader.subscribe((data) => this[dataName] = data);
      }
    );
  };

  isLoading = (data: DashboardData[]) => {
    return data.includes(null);
  }

  customiseToolip({ seriesName }) {
    return { text: seriesName };
  }

  ngOnInit(): void {
    this.loadData(this.groupByPeriods[1].toLowerCase());
  }
}

@NgModule({
  imports: [
    DxLoadPanelModule,
    DxButtonModule,
    DxToolbarModule,
    DxPieChartModule,
    DxChartModule,
    DxDropDownButtonModule,
    DxRangeSelectorModule,
    CardAnalyticsModule,
    ToolbarAnalyticsModule,
    ApplyPipeModule,
    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [AnalyticsSalesReportComponent],
})
export class AnalyticsSalesReportModule { }
