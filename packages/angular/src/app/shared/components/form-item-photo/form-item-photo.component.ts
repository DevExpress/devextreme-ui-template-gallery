import { CommonModule } from '@angular/common';
import {
 Component, Input, NgModule, OnInit,
} from '@angular/core';

@Component({
  selector: 'form-item-photo',
  template: `
    <div
      [ngStyle]="{
        'width.px': size,
        'height.px': size,
        'background-image': imageUrl
      }"
      class="photo dx-card"
      [style.backgroundImage]="imageUrl"
    ></div>
  `,
  styles: [`
  :host{
    position: relative;
    display: flex;
  }

  .photo {
    border-radius: 8px;
    background-repeat: no-repeat;
    background-size: cover;
  }
  `],
})
export class FormItemPhotoComponent implements OnInit {
  @Input() link: string;

  @Input() size?: number = 124;

  imageUrl: string;

  constructor() {
  }

  ngOnInit() {
    this.imageUrl = `url('data:image/png;base64,${this.link}')`;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [FormItemPhotoComponent],
  exports: [FormItemPhotoComponent],
})
export class FormItemPhotoModule { }
