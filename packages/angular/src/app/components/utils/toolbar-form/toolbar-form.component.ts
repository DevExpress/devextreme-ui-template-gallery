import {
  Component, Input, NgModule, Output, EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxButtonModule } from 'devextreme-angular/ui/button';

@Component({
  selector: 'toolbar-form',
  templateUrl: './toolbar-form.component.html',
  styleUrls: ['./toolbar-form.component.scss'],
})
export class ToolbarFormComponent {
  @Input() isEditing: boolean;

  @Input() titleClass: string;

  @Output() editModeToggled = new EventEmitter();

  @Output() saveButtonClicked = new EventEmitter();

  @Output() editingCancelled = new EventEmitter();

  handleCancelEditClick () {
    this.editingCancelled.emit();
  }

  handleEditClick () {
    this.editModeToggled.emit();
  }

  handleSaveButtonClick (event) {
    this.saveButtonClicked.emit(event);
  }
}

@NgModule({
  imports: [
    DxToolbarModule,
    DxButtonModule,

    CommonModule,
  ],
  providers: [],
  exports: [ToolbarFormComponent],
  declarations: [ToolbarFormComponent],
})
export class ToolbarFormModule { }
