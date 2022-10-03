import {
  Component,
  OnInit,
  NgModule,
  Input,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ItemClickEvent as TreeViewItemClickEvent } from 'devextreme/ui/tree_view';
import { ItemClickEvent as ToolbarItemClickEvent } from 'devextreme/ui/toolbar';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule, DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { CommonModule } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';
import { ScreenService } from '../../shared/services';
import { SideNavigationMenuModule, HeaderModule } from '../../shared/components';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav-inner-toolbar',
  templateUrl: './side-nav-inner-toolbar.component.html',
  styleUrls: ['./side-nav-inner-toolbar.component.scss'],
})
export class SideNavInnerToolbarComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: true }) scrollView!: DxScrollViewComponent;

  @Input()
  title!: string;

  selectedRoute = '';

  menuOpened!: boolean;

  temporaryMenuOpened = false;

  menuMode = 'shrink';

  menuRevealMode = 'expand';

  minMenuSize = 0;

  shaderEnabled = false;

  routerSubscription: Subscription;

  screenSubscription: Subscription;

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  constructor(private screen: ScreenService, private router: Router) { }

  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedRoute = event.urlAfterRedirects.split('?')[0];
      }
    });

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

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 60;
    this.shaderEnabled = !isLarge;
  }

  toggleMenu = (e: ToolbarItemClickEvent) => {
    this.menuOpened = !this.menuOpened;
    e.event?.stopPropagation();
  };

  navigationChanged(event: TreeViewItemClickEvent) {
    const path = (event.itemData as any).path;
    const pointerEvent = event.event;

    if (path && this.menuOpened) {
      if (event.node?.selected) {
        pointerEvent?.preventDefault();
      } else {
        this.router.navigate([path]);
        this.scrollView.instance.scrollTo(0);
      }

      if (this.hideMenuAfterNavigation) {
        this.temporaryMenuOpened = false;
        this.menuOpened = false;
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

  navigationClick() {
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }
}

@NgModule({
  imports: [SideNavigationMenuModule, DxDrawerModule, HeaderModule, DxToolbarModule, DxScrollViewModule, CommonModule],
  exports: [SideNavInnerToolbarComponent],
  declarations: [SideNavInnerToolbarComponent],
})
export class SideNavInnerToolbarModule { }
