import { CommonModule } from '@angular/common';
import {
  Component, Input, NgModule, OnInit,
} from '@angular/core';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';

@Component({
  selector: 'form-item-photo',
  templateUrl: './form-item-photo.component.html',
  styleUrls: ['./form-item-photo.component.scss'],
})
export class FormItemPhotoComponent implements OnInit {
  @Input() link: string;

  @Input() size?: number = 124;

  imageUrl: string;

  ngOnInit() {
    this.imageUrl = `url('data:image/png;base64,${this.link}')`;
  }
}

@NgModule({
  imports: [CommonModule, DxFileUploaderModule],
  declarations: [FormItemPhotoComponent],
  exports: [FormItemPhotoComponent],
})
export class FormItemPhotoModule { }
