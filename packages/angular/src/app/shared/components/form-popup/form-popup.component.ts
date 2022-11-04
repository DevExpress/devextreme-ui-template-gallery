import {
    Component,
    NgModule,
    OnDestroy,
    OnInit,
    Input,
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import {
    DxButtonModule,
    DxToolbarModule,
    DxPopupModule,
  } from 'devextreme-angular';
  import { ScreenService } from '../../../shared/services';
  import { Subscription } from 'rxjs';
  
  @Component({
    selector: 'form-popup',
    templateUrl: './form-popup.component.html',
    providers: [],
  })
  
  export class FormPopupComponent implements OnInit, OnDestroy {
    @Input() titleText = '';
    
    popupVisible = false;
  
    popupFullScreen = false;
  
    screenSubscription: Subscription;
  
    constructor(private screen: ScreenService) {
      this.closePopup = this.closePopup.bind(this);
    }
  
    ngOnInit(): void {
      this.popupFullScreen = this.screen.isSmallScreen();
      this.screenSubscription = this.screen.changed.subscribe(() => this.updatePopupByScreenSize());
    }

    ngOnDestroy(): void {
        this.screenSubscription.unsubscribe();
    }
  
    updatePopupByScreenSize() {
      this.popupFullScreen = this.screen.isSmallScreen();
    }
  
    closePopup() {
      this.popupVisible = false;
    }
  }
  
  @NgModule({
    imports: [
      DxButtonModule,
      DxToolbarModule,
      DxPopupModule,
  
      CommonModule,
    ],
    declarations: [FormPopupComponent],
    exports: [FormPopupComponent],
  })
  export class FormPopupModule { }
  