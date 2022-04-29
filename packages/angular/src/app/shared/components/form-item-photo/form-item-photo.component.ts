import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';

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
export class FormItemPhotoComponent {
  @Input() link: string;

  @Input() size?: number;

  imageUrl: string;

  constructor() {
      this.size = 124;
  }

  ngOnInit() {
    this.imageUrl = `url(\'data:image/png;base64,${this.link}')`
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [FormItemPhotoComponent],
  exports: [FormItemPhotoComponent],
})
export class FormItemPhotoModule { }
