import { Output, Injectable, EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { ReplaySubject, Subscription } from 'rxjs';

const Breakpoints = {
  XSmall: '(max-width: 575.98px)',
  Small: '(min-width: 576px) and (max-width: 991.98px)',
  Medium: '(min-width: 992px) and (max-width: 1199.98px)',
  Large: '(min-width: 1200px) and (max-width: 1399.98px)',
  XLarge: '(min-width: 1400px)',
}

export function getSizeQualifier(width: number) {
  if (width <= 420) return 'xs';
  if (width <= 992) return 'sm';
  if (width < 1200) return 'md';
  return 'lg';
}

@Injectable()
export class ScreenService {
  @Output() changed = new EventEmitter();
  @Output() xSmallScreenChanged = new ReplaySubject<boolean>();
  @Output() smallScreenChanged = new ReplaySubject<boolean>();
  @Output() screenChanged = new ReplaySubject<{ isXSmall: boolean, isSmall: boolean, isMedium: boolean, isLarge: boolean, isXLarge: boolean }>();

  breakpointSubscription: Subscription;

  constructor(private breakpointObserver$: BreakpointObserver) {
    this.breakpointSubscription = this.breakpointObserver$
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe((data) => {
        this.xSmallScreenChanged.next(data.breakpoints[Breakpoints.XSmall]);
        this.smallScreenChanged.next(data.breakpoints[Breakpoints.Small] || data.breakpoints[Breakpoints.XSmall]);
        this.screenChanged.next({
          isXSmall: data.breakpoints[Breakpoints.XSmall],
          isSmall: data.breakpoints[Breakpoints.Small],
          isMedium: data.breakpoints[Breakpoints.Medium],
          isLarge: data.breakpoints[Breakpoints.Large],
          isXLarge: data.breakpoints[Breakpoints.XLarge]
        });
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
      'screen-x-small': this.breakpointObserver$.isMatched(Breakpoints.XSmall),
      'screen-small': this.breakpointObserver$.isMatched(Breakpoints.Small),
      'screen-medium': this.breakpointObserver$.isMatched(Breakpoints.Medium),
      'screen-large': this.isLargeScreen(),
    };
  }
}
