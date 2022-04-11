import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import {
  DxTextAreaModule,
  DxToolbarModule,
} from 'devextreme-angular';

type Note = {
  manager: string,
  date: string | Date,
  text: string
};

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() items: Array<Note> | Promise<Array<Note>> ;

  constructor() {
  }

  ngOnInit(): void {
  }
}

@NgModule({
  imports: [ 
    DxTextAreaModule,
    DxToolbarModule,

    CommonModule
  ],
  declarations: [ NotesComponent ],
  exports: [ NotesComponent ]
})
export class NotesModule { }