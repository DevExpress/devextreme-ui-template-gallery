import { Component, Input } from '@angular/core';
import { Opportunity } from 'src/app/types/opportunities';
import { CommonModule } from "@angular/common";
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'opportunity-tile',
  templateUrl: 'opportunity-tile.component.html',
  styleUrls: ['./opportunity-tile.component.scss'],
  imports: [ CommonModule ],
})

export class OpportunityTileComponent {
  @Input() data: Opportunity;

  opportunityClick() {
    notify('Click opportunity event');
  }
}
