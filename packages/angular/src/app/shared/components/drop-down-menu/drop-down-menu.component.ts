import { Component, Input, NgModule } from '@angular/core';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';

@Component({
  selector: 'drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})
export class DropDownMenuComponent {
  @Input() items: Array<{ text: string }>;
  @Input() visible = true;

  constructor() { }

}

@NgModule({
  imports: [DxDropDownButtonModule],
  declarations: [DropDownMenuComponent],
  exports: [DropDownMenuComponent],
})
export class DropDownMenuModule { }
