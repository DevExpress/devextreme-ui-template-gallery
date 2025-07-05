import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';
import { CardAuthComponent } from '../../components/library/card-auth/card-auth.component'

@Component({
    selector: 'app-single-card',
    templateUrl: './single-card.component.html',
    styleUrls: ['./single-card.component.scss'],
    imports: [
      CommonModule,
      DxScrollViewModule,
      CardAuthComponent,
    ],
})
export class SingleCardComponent {
  @Input()
  title!: string;

  @Input()
  description!: string;
}

