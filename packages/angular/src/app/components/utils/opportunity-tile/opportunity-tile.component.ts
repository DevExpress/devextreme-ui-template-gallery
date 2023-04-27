import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Opportunity } from 'src/app/types/opportunities';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'opportunity-tile',
  templateUrl: 'opportunity-tile.component.html',
  styleUrls: ['./opportunity-tile.component.scss'],
})

export class OpportunityTileComponent {
  @Input() data: Opportunity;

  opportunityClick() {
    notify('Click opportunity event');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [OpportunityTileComponent],
  exports: [OpportunityTileComponent],
})
export class OpportunityTileModule { }