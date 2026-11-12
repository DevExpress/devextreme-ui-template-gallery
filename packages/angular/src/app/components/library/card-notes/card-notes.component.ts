import { CommonModule } from '@angular/common';
import { Component, Input, input, linkedSignal } from '@angular/core';
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
  @Input() user!: string;

  items = input<Notes>();

  // Local copy, reset whenever the parent passes a new array.
  notes = linkedSignal<Notes>(() => this.items() ?? []);

  nodeText = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  add = (e: any) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    const newNote: Note = {
      manager: this.user,
      date: new Date(),
      text: this.nodeText,
    };

    this.notes.update((notes) => [...notes, newNote]);

    e.validationGroup.reset();
  };
}
