import { CommonModule } from '@angular/common';
import {
 Component, Input, NgModule, OnInit,
} from '@angular/core';
import {
  DxTextAreaModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { Notes, Note } from 'src/app/shared/types/notes';

@Component({
  selector: 'card-notes',
  templateUrl: './card-notes.component.html',
  styleUrls: ['./card-notes.component.scss'],
})
export class CardNotesComponent implements OnInit {
  @Input() user: string;

  @Input() items: Notes;

  nodeText: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  defaultText = () => {
    this.nodeText = '';
  };

  send = () => {
    if (this.nodeText === '') {
      return;
    }

    const newNote: Note = {
      manager: this.user,
      date: new Date(),
      text: this.nodeText,
    };

    this.items.push(newNote);

    this.defaultText();
  };
}

@NgModule({
  imports: [
    DxTextAreaModule,
    DxToolbarModule,

    CommonModule,
  ],
  declarations: [CardNotesComponent],
  exports: [CardNotesComponent],
})
export class CardNotesModule { }
