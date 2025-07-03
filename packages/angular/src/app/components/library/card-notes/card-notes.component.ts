import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  DxTextAreaModule,
  DxToolbarModule,
  DxButtonModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxScrollViewModule
} from 'devextreme-angular';
import { Notes, Note } from 'src/app/types/notes';

@Component({
    selector: 'card-notes',
    templateUrl: './card-notes.component.html',
    styleUrls: ['./card-notes.component.scss'],
    imports: [
      DxTextAreaModule,
      DxToolbarModule,
      DxButtonModule,
      DxValidationGroupModule,
      DxValidatorModule,
      DxScrollViewModule,
      CommonModule,
    ]
})
export class CardNotesComponent {
  @Input() user: string;

  @Input() items: Notes;

  nodeText = '';

  add = (e) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    const newNote: Note = {
      manager: this.user,
      date: new Date(),
      text: this.nodeText,
    };

    this.items.push(newNote);

    e.validationGroup.reset();
  };
}
