import { CommonModule } from '@angular/common';
import {
  Component, NgModule,
} from '@angular/core';
import { DxFileUploaderModule } from 'devextreme-angular/ui/file-uploader';

@Component({
  selector: 'form-photo-uploader',
  template: `
    <div 
      id="uploader"
      [ngClass]="
        isDropZoneActive
          ? ['dx-theme-accent-as-border-color']
          : ['dx-theme-border-color']
      "
    >
      <span>Drag and drop a photo here or click the area to select it from a folder</span>
    </div>
    <dx-file-uploader
      dialogTrigger="#uploader"
      dropZone="#uploader"
      [multiple]="false"
      accept="image/*"
      uploadMode="instantly"
      [showFileList]=false
      [visible]="false"
      (onDropZoneEnter)="onDropZoneEnter($event)"
      (onDropZoneLeave)="onDropZoneLeave($event)"
    >
    </dx-file-uploader>
`,
  styles: [`
    #uploader {
      background-color: var(--typography-bg);
      border-width: 1.5px;
      border-style: dashed;
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
        text-align: center;
      }
    }
  `],
})
export class FormPhotoUploaderComponent { 
  isDropZoneActive = false;

  onDropZoneEnter(e) {
    if (e.dropZoneElement.id === 'uploader') { this.isDropZoneActive = true; }
  }

  onDropZoneLeave(e) {
    if (e.dropZoneElement.id === 'uploader') { this.isDropZoneActive = false; }
  }
}

@NgModule({
  imports: [CommonModule, DxFileUploaderModule],
  declarations: [FormPhotoUploaderComponent],
  exports: [FormPhotoUploaderComponent],
})
export class FormPhotoUploaderModule { }
