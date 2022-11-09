import { CommonModule } from '@angular/common';
import {
  Component, NgModule, Input, OnInit, ElementRef, OnDestroy, AfterContentInit,
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

export class CardAnalytticsComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() titleText: string;

  @Input() contentClass: string;

  @Input() component: { instance: { render: () => void, element: () => HTMLElement }};

  @Input() isMenuVisible = true;

  @Input() isLoading = true;

  resizeObserver: ResizeObserver;

  resizeObserverSubscription: Subscription;

  observedElement = this.el.nativeElement;

  menuItems: Array<{ icon: string, items: Array<{ text: string }> }> = [{
    icon: 'overflow',
    items: [
      { text: 'Hide' },
    ],
  }];

  position: PositionConfig;

  loadingHeight: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.position = {
      of: `.${this.contentClass + (!this.isGreyCard() ? ' .content' : ' .title')}`,
      at: (!this.isGreyCard() ? 'center' : 'right'),
    };
    this.loadingHeight = !this.isGreyCard() ? 60 : 50;
  }

  ngAfterContentInit(): void {
    if (!this.isGreyCard() && this.component) {
      this.resizeObserverSubscription = new ResizeObservable(this.component.instance.element())
        .pipe(debounceTime(100))
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
