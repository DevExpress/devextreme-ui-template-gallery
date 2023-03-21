import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule, DxDateBoxModule, DxFormModule, DxNumberBoxModule, DxSelectBoxModule,
  DxTextBoxModule, DxToolbarModule,
  DxValidatorModule
} from "devextreme-angular";
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { FormTextboxModule } from '../form-textbox/form-textbox.component';
import { FormPhotoModule } from '../form-photo/form-photo.component';
import { ContactStatusModule } from '../contact-status/contact-status.component';
import { contactStatusList } from '../../types/contact';
import { ApplyPipeModule } from '../../pipes/apply.pipe';
import { PicturedItemSelectBoxModule } from '../pictured-item-select-box/pictured-item-select-box.component';
import {ScreenService} from "../../services";

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['profile-card.component.scss'],
})
export class ProfileCardComponent {
  @Input() cardData: Record<string, any>;

  @Input() items: Record<string, any>[] = [];

  @Input() colCount: number = 2;

  @Input() title: string = '';

  @Output() valueChange = new EventEmitter<string>();

  statusList = contactStatusList;

  constructor(public screen: ScreenService) {
  }
  valueChanged(e) {
    this.valueChange.emit(e.value);
  }

  extendEditorOptions = (itemEditorOptions) => ({stylingMode: 'outlined', ...itemEditorOptions})
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
    ContactStatusModule,
    FormTextboxModule,
    FormPhotoModule,
    DxValidatorModule,
    CommonModule,
    PicturedItemSelectBoxModule,
  ],
  declarations: [ProfileCardComponent],
  exports: [ProfileCardComponent],
})
export class ProfileCardModule { }
