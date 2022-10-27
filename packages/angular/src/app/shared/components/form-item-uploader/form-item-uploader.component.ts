import { CommonModule } from '@angular/common';
import {
  Component, NgModule,
} from '@angular/core';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';

@Component({
  selector: 'form-item-uploader',
  template: `
    <div class="uploader">
      <span>Drag and drop a photo here or click the area to select it from a folder</span>
    </div>
    <dx-file-uploader
      dialogTrigger=".photo"
      dropZone=".photo"
      [multiple]="false"
      accept="image/*"
      uploadMode="instantly"
      [visible]="false"
      >
    </dx-file-uploader>
`,
  styles: [`
    .uploader {
      background-color: rgba(0, 0, 0, 0.04);
      border-width: 2px;
      border-style: dashed;
      border-color: rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 124px;
      user-select: none;
      line-height: inherit;
      margin-bottom: 10px;

      & > span {
        font-weight: 100;
        opacity: 0.5;
        text-align: center;
      }
    }
  `],
})
export class FormItemUploaderComponent { }

@NgModule({
  imports: [CommonModule, DxFileUploaderModule],
  declarations: [FormItemUploaderComponent],
  exports: [FormItemUploaderComponent],
})
export class FormItemUploaderModule { }
