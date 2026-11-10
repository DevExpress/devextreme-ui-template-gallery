import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import { DxDrawerModule, DxDrawerTypes } from 'devextreme-angular/ui/drawer';
import { DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';

import { ScreenService, AppInfoService } from '../../services';
import { SideNavigationMenuComponent, AppHeaderComponent, AppFooterComponent } from '../../components';
import { SideNavigationItem } from '../../types/navigation';

@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss'],
  imports: [
    RouterModule,
    SideNavigationMenuComponent,
    DxDrawerModule,
    AppHeaderComponent,
    CommonModule,
    AppFooterComponent
  ],
})
export class SideNavOuterToolbarComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: true }) scrollView!: DxScrollViewComponent;

  @Input()
  title!: string;

  private screen = inject(ScreenService);

  private router = inject(Router);

  protected appInfo = inject(AppInfoService);

  selectedRoute = signal('');

  menuOpened = signal(false);

  temporaryMenuOpened = false;

  menuMode = signal<DxDrawerTypes.OpenedStateMode>('shrink');

  menuRevealMode = signal<DxDrawerTypes.RevealMode>('expand');

  minMenuSize = signal(0);

  shaderEnabled = signal(false);

  private isLargeScreen = false;

  routerSubscription: Subscription;

  screenSubscription!: Subscription;

  constructor() {
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.selectedRoute.set(event.urlAfterRedirects.split('?')[0]);
      }
    });
  }

  ngOnInit() {
    this.isLargeScreen = this.screen.sizes['screen-large'];
    this.menuOpened.set(this.isLargeScreen);

    this.screenSubscription = this.screen.changed.subscribe(() => this.updateDrawer());

    this.updateDrawer();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.screenSubscription.unsubscribe();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode.set(isLarge ? 'shrink' : 'overlap');
    this.menuRevealMode.set(isXSmall ? 'slide' : 'expand');
    this.minMenuSize.set(isXSmall ? 0 : 48);
    this.shaderEnabled.set(!isLarge);

    if (this.isLargeScreen && !isLarge) {
      this.menuOpened.set(false);
      this.temporaryMenuOpened = false;
    } else if (!this.isLargeScreen && isLarge) {
      this.menuOpened.set(true);
      this.temporaryMenuOpened = false;
    }

    this.isLargeScreen = isLarge;
  }

  get hideMenuAfterNavigation() {
    return this.menuMode() === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened();
  }

  navigationChanged(event: DxTreeViewTypes.ItemClickEvent<SideNavigationItem>) {
    const path = event.itemData?.path;
    const pointerEvent = event.event;

    if (path && this.menuOpened()) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([path]);
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened.set(false);
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened.set(true);
    }
  }
}
