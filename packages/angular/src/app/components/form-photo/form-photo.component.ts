import { CommonModule } from '@angular/common';
import {
  Component, ElementRef, Input, NgModule, OnInit,
} from '@angular/core';
import {DxFileUploaderModule} from "devextreme-angular/ui/file-uploader";

@Component({
  selector: 'form-photo',
  template: `
  <div
    [ngStyle]="{
      'width.px': size,
      'height.px': size,
      'max-height.px': size,
      'background-image': imageUrl
    }"
    class="photo dx-card"
    [style.backgroundImage]="imageUrl"
    [class.editable]="editable"
  >
    <i *ngIf="editable" class="edit-icon dx-icon-photo"></i>
  </div>
  <dx-file-uploader *ngIf="editable"
    [dialogTrigger]="hostRef"
    [visible]="false"
    accept="image/*"
  ></dx-file-uploader>
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

    :host:hover {
      .editable {
        &:before, .edit-icon {
          opacity: 1;
          transition: opacity 400ms;
        }
      }
    }

    .editable {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:before {
        content: '';
        opacity: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.5);
      }

      .edit-icon {
        opacity: 0;
        display: block;
        position: absolute;
        color: white;
        font-size: 28px;
      }
    }
  `],
})
export class FormPhotoComponent implements OnInit {
  @Input() link: string;

  @Input() editable = false;

  @Input() size?: number = 124;

  imageUrl: string;

  hostRef: HTMLElement;

  constructor(private elRef:ElementRef) {
    this.hostRef = this.elRef.nativeElement;
  }

  ngOnInit() {
    this.imageUrl = `url('data:image/png;base64,${this.link}')`;
  }
}

@NgModule({
  imports: [
    DxFileUploaderModule,
    CommonModule],
  declarations: [FormPhotoComponent],
  exports: [FormPhotoComponent],
})
export class FormPhotoModule { }
