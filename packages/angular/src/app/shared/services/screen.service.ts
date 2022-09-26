import { Output, Injectable, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subscription } from 'rxjs';

@Injectable()
export class ScreenService {
  @Output() changed = new EventEmitter();

  breakpointSubscription: Subscription;

  constructor(private breakpointObserver$: BreakpointObserver) {
    this.breakpointSubscription = this.breakpointObserver$
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe((data) => this.changed.next(data));
  }

  public onSubscribe(): void {
    this.breakpointSubscription.unsubscribe();
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
