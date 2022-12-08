import { CommonModule } from '@angular/common';
import {
  Component, Input, NgModule, OnInit,
} from '@angular/core';

@Component({
  selector: 'form-photo',
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
export class FormPhotoComponent implements OnInit {
  @Input() link: string;

  @Input() size?: number = 124;

  imageUrl: string;

  ngOnInit() {
    this.imageUrl = `url('data:image/png;base64,${this.link}')`;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [FormPhotoComponent],
  exports: [FormPhotoComponent],
})
export class FormPhotoModule { }
