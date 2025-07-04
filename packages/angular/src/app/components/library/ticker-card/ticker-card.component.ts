import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Sales, SalesOrOpportunitiesByCategory } from '../../../types/analytics';
import { ApplyPipeModule } from "src/app/pipes/apply.pipe";

@Component({
    selector: 'ticker-card',
    templateUrl: './ticker-card.component.html',
    styleUrls: ['./ticker-card.component.scss'],
    imports: [
      ApplyPipeModule,
      CommonModule,
    ],
})

export class TickerCardComponent {
  @Input() titleText: string;

  @Input() data: SalesOrOpportunitiesByCategory | Sales | null = null;

  @Input() total: string | null = null;

  @Input() percentage: number;

  @Input() icon: string;

  @Input() tone?: 'warning' | 'info';

  @Input() contentClass: string | null = null;

  getTotal(data: Array<{value?: number, total?: number}> ): number {
    return (data || []).reduce((total, item) => total + (item.value || item.total), 0);
  }

  abs(value: number): number {
    return Math.abs(value);
  }

  getIconClass = () => this.tone || (this.percentage > 0 ? 'positive' : 'negative');
}

