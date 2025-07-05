import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DxFileUploaderComponent } from "devextreme-angular";

@Component({
    selector: 'form-photo',
    templateUrl: './form-photo.component.html',
    styleUrls: ['./form-photo.component.scss'],
    imports: [
      DxFileUploaderComponent,
      CommonModule,
    ],
})
export class FormPhotoComponent implements OnInit {
  @Input() link: string;

  @Input() editable = false;

  @Input() size = 124;

  imageUrl: string;

  hostRef = this.elRef.nativeElement;

  constructor(private elRef:ElementRef) {}

  ngOnInit() {
    this.imageUrl = `url('data:image/png;base64,${this.link}')`;
  }
}
