import {
  Component, EventEmitter, Input, NgModule, OnInit, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'appointment-tooltip',
  templateUrl: './appointment-tooltip.component.html',
  styleUrls: ['./appointment-tooltip.component.scss'],
})
export class AppointmentTooltipComponent implements OnInit {
  @Input() data: Record<string, any>;

  @Output() clickDeleteAppointment = new EventEmitter<any>();

  timeString = '';

  ngOnInit() {
    this.timeString = `${this.data.startDate.toLocaleString()} - ${this.data.endDate.toLocaleTimeString()}`
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
  ],
  declarations: [AppointmentTooltipComponent],
  exports: [AppointmentTooltipComponent],
})
export class AppointmentTooltipModule { }
