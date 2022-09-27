import { CommonModule } from '@angular/common';
import {
  Component, NgModule, Input, SimpleChanges, OnChanges, OnInit, ElementRef, OnDestroy, Output,
} from '@angular/core';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { PositionConfig } from 'devextreme/animation/position';
import { DxMenuModule } from 'devextreme-angular/ui/menu';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

class ResizeObservable extends Observable<ResizeObserverEntry[]> {
  constructor(el: HTMLElement) {
    super((subscriber) => {
      const ro = new ResizeObserver((entries) => {
        subscriber.next(entries);
      });

      ro.observe(el);

      return function unsubscribe() {
        ro.unobserve(el);
        ro.disconnect();
      };
    });
  }
}

@Component({
  selector: 'card-analytics',
  templateUrl: './card-analytics.component.html',
  styleUrls: ['./card-analytics.component.scss'],
})

export class CardAnalytticsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() titleText: string;

  @Input() contentClass: string;

  @Input() showData = false;

  @Input() component: any;

  @Input() isMenuVisible = true;

  resizeObserver: ResizeObserver;

  resizeObserverSubscription: Subscription;

  observedElement = this.el.nativeElement;

  cardMenuItems: Array<{ icon: string, items: Array<{ text: string }> }> = [{
    icon: 'overflow',
    items: [
      { text: 'Hide' },
    ],
  }];

  isLoading = true;

  position: PositionConfig;

  size: { width: number, height: number };

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isLoading = !changes.showData.currentValue;
  }

  ngOnInit(): void {
    this.position = { of: `.${(!this.isGreyCard() ? this.contentClass : 'title')}` };
    this.size = !this.isGreyCard() ? { width: 60, height: 60 } : { width: 50, height: 50 };

    if (!this.isGreyCard() && this.component) {
      this.resizeObserverSubscription = new ResizeObservable(this.observedElement)
        .pipe(debounceTime(300))
        .subscribe(this.resizeCallback.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (!this.isGreyCard() && this.component) {
      this.resizeObserverSubscription.unsubscribe();
    }
  }

  resizeCallback() {
    if (this.component) {
      this.component.instance.render();
    }
  }

  isGreyCard() {
    return this.el.nativeElement.classList[0] === 'grey';
  }
}

@NgModule({
  imports: [
    DxLoadPanelModule,
    DxMenuModule,

    CommonModule,
  ],
  declarations: [CardAnalytticsComponent],
  exports: [CardAnalytticsComponent],
})
export class CardAnalyticsModule { }
