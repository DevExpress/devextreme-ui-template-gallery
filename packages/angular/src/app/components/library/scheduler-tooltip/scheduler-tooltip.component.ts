import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';
import {ApplyPipeModule} from "../../../pipes/apply.pipe";

@Component({
  selector: 'scheduler-tooltip',
  templateUrl: './scheduler-tooltip.component.html',
  styleUrls: ['./scheduler-tooltip.component.scss'],
})
export class SchedulerTooltipComponent {
  @Input() selectedAppointmentData: Record<string, any>;

  @Output() clickDeleteAppointment = new EventEmitter<any>();

  @Output() clickEditAppointment = new EventEmitter<any>();

  getTimeString = (selectedAppointmentData) => {
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    };

    const dateOptions = {
      ...timeOptions,
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };

    return `${selectedAppointmentData.startDate.toLocaleString(undefined, dateOptions)} - ${selectedAppointmentData.endDate?.toLocaleTimeString(undefined, timeOptions)}`;
  }
}

@NgModule({
  imports: [
    ApplyPipeModule,
    CommonModule,
    DxButtonModule,
  ],
  declarations: [SchedulerTooltipComponent],
  exports: [SchedulerTooltipComponent],
})
export class SchedulerTooltipModule { }
