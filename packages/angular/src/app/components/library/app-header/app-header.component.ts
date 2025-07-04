import {
  Component, NgModule, Input, Output, EventEmitter, OnInit, inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { UserPanelModule } from '../user-panel/user-panel.component';
import { AuthService, IUser } from 'src/app/services';
import { ThemeSwitcherComponent } from 'src/app/components/library/theme-switcher/theme-switcher.component';

@Component({
    selector: 'app-header',
    templateUrl: 'app-header.component.html',
    styleUrls: ['./app-header.component.scss'],
    imports: [
        CommonModule,
        DxButtonModule,
        DxToolbarModule,
        ThemeSwitcherComponent,
        UserPanelModule,
    ]
})

export class AppHeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  private authService = inject(AuthService);

  user: IUser | null = { email: '' };

  userMenuItems = [
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    },
  }];

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  };
}
