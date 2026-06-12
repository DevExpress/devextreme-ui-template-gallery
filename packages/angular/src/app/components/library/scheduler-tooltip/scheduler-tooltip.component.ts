import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';
import { ApplyPipeDirective } from "../../../pipes/apply.pipe";

@Component({
  selector: 'scheduler-tooltip',
  templateUrl: './scheduler-tooltip.component.html',
  styleUrls: ['./scheduler-tooltip.component.scss'],
  imports: [
    ApplyPipeDirective,
    CommonModule,
    DxButtonModule,
  ],
})
export class SchedulerTooltipComponent {
  @Input() selectedAppointmentData!: Record<string, any>;

  @Output() clickDeleteAppointment = new EventEmitter<any>();

  @Output() clickEditAppointment = new EventEmitter<any>();

  getTimeString = (selectedAppointmentData: Record<string, Date | string>) => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
      ...timeOptions,
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    const startDate = new Date(selectedAppointmentData.startDate);
    const endDate = selectedAppointmentData.endDate
      ? new Date(selectedAppointmentData.endDate)
      : null;

    return `${startDate.toLocaleString(undefined, dateOptions)} - ${endDate?.toLocaleTimeString(undefined, timeOptions) ?? ''}`;
  }
}
