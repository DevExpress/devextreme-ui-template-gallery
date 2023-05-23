import {
  Component, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxListModule } from 'devextreme-angular/ui/list';
import { Duration } from 'luxon';
import { ApplyPipeModule } from "../../../pipes/apply.pipe";

@Component({
  selector: 'agenda-list-item',
  template: `
    <div class='agenda-list-item'>
      <div class='time'>
        <div class='start'>{{getStart| apply: appointment}}</div>
        <div class='duration'>{{ getFormattedDuration | apply: appointment}}</div>
      </div>
      <div class='description'>
        <div class='description-title'>
          {{appointment.text}}
        </div>
        <div class='description-resource'>
          {{resources[appointment.calendarId]?.text}}
        </div>
      </div>
    </div>
`,
  styleUrls: ['./agenda-list-item.component.scss'],
})
export class AgendaListItemComponent {
  @Input() appointment: Record<string, any> = {};

  @Input() resources: Record<string, any> = [];

  getFormattedDuration = ({ startDate, endDate }) => {
    return Duration.fromMillis(endDate - startDate)
      .rescale()
      .toFormat("h'h' m'm'");
  };

  getStart = (appointment) => {
    return appointment.startDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
  };
}

@NgModule({
  imports: [
    CommonModule,
    DxListModule,
    ApplyPipeModule,
  ],
  declarations: [AgendaListItemComponent],
  exports: [AgendaListItemComponent],
})
export class AgendaListItemModule {}
