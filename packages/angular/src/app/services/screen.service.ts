import { Output, Injectable, EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { ReplaySubject, Subscription} from 'rxjs';

const Breakpoints = {
  SmallMobile: '(max-width: 420px)',
  XSmall: '(max-width: 575.98px)',
  Small: '(min-width: 576px) and (max-width: 991.98px)',
  Medium: '(min-width: 992px) and (max-width: 1199.98px)',
  Large: '(min-width: 1200px) and (max-width: 1399.98px)',
  XLarge: '(min-width: 1400px)',
}

@Injectable()
export class ScreenService {
  @Output() changed = new EventEmitter();
  @Output() smallMobileScreenChanged = new ReplaySubject<boolean>();
  @Output() xSmallScreenChanged = new ReplaySubject<boolean>();

  breakpointSubscription: Subscription;

  constructor(private breakpointObserver$: BreakpointObserver) {
    this.breakpointSubscription = this.breakpointObserver$
      .observe([Breakpoints.SmallMobile, Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe((data) => {
        this.smallMobileScreenChanged.next(data.breakpoints[Breakpoints.SmallMobile]);
        this.xSmallScreenChanged.next(data.breakpoints[Breakpoints.XSmall]);
        this.changed.next(data);
      }
      );
  }

  private isLargeScreen() {
    const isLarge = this.breakpointObserver$.isMatched(Breakpoints.Large);
    const isXLarge = this.breakpointObserver$.isMatched(Breakpoints.XLarge);

    return isLarge || isXLarge;
  }

  public get sizes(): Record<string, boolean> {
    return {
      'screen-small-mobile': this.breakpointObserver$.isMatched(Breakpoints.SmallMobile),
      'screen-x-small': this.breakpointObserver$.isMatched(Breakpoints.XSmall),
      'screen-small': this.breakpointObserver$.isMatched(Breakpoints.Small),
      'screen-medium': this.breakpointObserver$.isMatched(Breakpoints.Medium),
      'screen-large': this.isLargeScreen(),
    };
  }
}
