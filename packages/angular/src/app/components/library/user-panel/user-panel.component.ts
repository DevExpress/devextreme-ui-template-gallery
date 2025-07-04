import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { UserMenuSectionComponent } from '../user-menu-section/user-menu-section.component';
import { IUser } from '../../../services/auth.service';
@Component({
    selector: 'user-panel',
    templateUrl: 'user-panel.component.html',
    styleUrls: ['./user-panel.component.scss'],
    imports: [
      DxDropDownButtonModule,
      UserMenuSectionComponent,
      CommonModule,
    ],
})

export class UserPanelComponent {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;

  @Input()
  user!: IUser | null;

  @ViewChild(UserMenuSectionComponent) userMenuSection: UserMenuSectionComponent;

  handleDropDownButtonContentReady({ component }) {
    component.registerKeyHandler('downArrow', () => {
      this.userMenuSection.userInfoList.nativeElement.focus();
    });
  }
}
