import { Component, HostBinding, inject, OnDestroy } from '@angular/core';
import { RouterModule } from "@angular/router";

import { DxHttpModule } from "devextreme-angular/http";

import { ScreenService, ThemeService } from './services';
import { UnauthenticatedContentModule } from "./layouts";
import { CrmContactDetailsModule } from "./pages/crm-contact-details/crm-contact-details.component";
import { PlanningTaskListModule } from "./pages/planning-task-list/planning-task-list.component";
import { PlanningTaskDetailsModule } from "./pages/planning-task-details/planning-task-details.component";
import { AnalyticsDashboardModule } from "./pages/analytics-dashboard/analytics-dashboard.component";
import { AnalyticsSalesReportModule } from "./pages/analytics-sales-report/analytics-sales-report.component";
import { AnalyticsGeographyModule } from "./pages/analytics-geography/analytics-geography.component";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
      DxHttpModule,
      UnauthenticatedContentModule,
      CrmContactDetailsModule,
      PlanningTaskListModule,
      PlanningTaskDetailsModule,
      AnalyticsDashboardModule,
      AnalyticsSalesReportModule,
      AnalyticsGeographyModule,
      RouterModule,
  ]
})
export class AppComponent implements OnDestroy {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl]).join(' ');
  }
  private themeService =  inject(ThemeService);
  private screen = inject(ScreenService);

  constructor() {
    this.themeService.setAppTheme();
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }
}
