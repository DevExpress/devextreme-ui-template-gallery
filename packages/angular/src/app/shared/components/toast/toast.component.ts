import {
 Component, NgModule, Output, ViewChild,
} from '@angular/core';
import { DxToastComponent, DxToastModule } from 'devextreme-angular';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
})
export class ToastComponent {
    @ViewChild('toastComponent', { static: false }) toastComponent: DxToastComponent;

    @Output() notify = (message: string) => {
        this.toastComponent.instance.option('message', message);
        this.toastComponent.instance.option('visible', true);
    };

    constructor() { }
}

@NgModule({
    imports: [DxToastModule],
    providers: [],
    exports: [ToastComponent],
    declarations: [ToastComponent],
})
export class ToastModule { }
