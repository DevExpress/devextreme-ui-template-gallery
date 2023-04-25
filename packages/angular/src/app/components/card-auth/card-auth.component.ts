import { CommonModule } from '@angular/common';
import { Component, NgModule, Input } from '@angular/core';

@Component({
  selector: 'app-card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss'],
})
export class CardAuthComponent {
  @Input()
  title!: string;

  @Input()
  description!: string;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [CardAuthComponent],
  exports: [CardAuthComponent],
})
export class CardAuthModule { }
