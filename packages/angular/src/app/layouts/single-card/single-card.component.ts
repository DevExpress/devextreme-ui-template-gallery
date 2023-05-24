import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CardAuthModule } from '../../components/library/card-auth/card-auth.component'

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss'],
})
export class SingleCardComponent {
  @Input()
  title!: string;

  @Input()
  description!: string;

  constructor() { }
}

@NgModule({
  imports: [CommonModule, DxScrollViewModule, CardAuthModule],
  exports: [SingleCardComponent],
  declarations: [SingleCardComponent],
})
export class SingleCardModule {

}
