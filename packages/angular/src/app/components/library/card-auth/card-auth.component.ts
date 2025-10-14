import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss'],
  imports: [ CommonModule ],
})
export class CardAuthComponent {
  @Input()
  title!: string;

  @Input()
  description!: string;
}
