import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxButtonComponent } from "devextreme-angular";

@Component({
    selector: 'toolbar-form',
    templateUrl: './toolbar-form.component.html',
    styleUrls: ['./toolbar-form.component.scss'],
    imports: [
      DxToolbarModule,
      DxButtonComponent,
      CommonModule,
    ],
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
