import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule, DxDateBoxModule, DxFormModule, DxNumberBoxModule, DxSelectBoxModule,
  DxTextBoxModule, DxToolbarModule,
  DxValidatorModule
} from 'devextreme-angular';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { FormTextboxModule } from '../form-textbox/form-textbox.component';
import { FormPhotoModule } from '../form-photo/form-photo.component';
import { ApplyPipeModule } from '../../pipes/apply.pipe';
import { PicturedItemSelectBoxModule } from '../pictured-item-select-box/pictured-item-select-box.component';
import { ScreenService } from '../../services';
import { StatusSelectBoxModule } from '../status-select-box/status-select-box.component';
import { getSizeQualifier } from 'src/app/services/screen.service';

type CardData = Record<string, any>;

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['profile-card.component.scss'],
})
export class ProfileCardComponent {
  @Input() items: Record<string, any>[] = [];

  @Input() colCount: number = 2;

  @Input() title: string = '';

  @Output() dataChanged = new EventEmitter<any>();

  @Input() cardData: CardData;

  getSizeQualifier = getSizeQualifier;

  assign = Object.assign;

  constructor(public screen: ScreenService) {}
}

@NgModule({
  imports: [
    ApplyPipeModule,
    DxButtonModule,
    DxDateBoxModule,
    DxFormModule,
    DxNumberBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxTextBoxModule,
    FormTextboxModule,
    FormPhotoModule,
    DxValidatorModule,
    CommonModule,
    PicturedItemSelectBoxModule,
    StatusSelectBoxModule,
  ],
  declarations: [ProfileCardComponent],
  exports: [ProfileCardComponent],
})
export class ProfileCardModule { }
