import {
  Component, inject, OnInit, ViewChild
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { CommonModule } from '@angular/common';
import {
  DxCalendarModule,
  DxButtonModule,
  DxTooltipComponent,
  DxTooltipModule,
  DxSchedulerModule,
  DxSchedulerComponent,
  DxSpeedDialActionModule,
} from "devextreme-angular";
import { DxSchedulerTypes } from 'devextreme-angular/ui/scheduler'

import { Task } from 'src/app/types/task';
import { DataService, ScreenService } from 'src/app/services';
import { CalendarListComponent } from 'src/app/components/utils/calendar-list/calendar-list.component';
import { LeftSidePanelComponent } from 'src/app/components/utils/left-side-panel/left-side-panel.component';
import { RightSidePanelComponent } from 'src/app/components/utils/right-side-panel/right-side-panel.component';
import { AgendaItem, AgendaComponent } from "../../components/utils/agenda/agenda.component";
import { ApplyPipeDirective } from '../../pipes/apply.pipe';
import { SchedulerTooltipComponent } from '../../components/library/scheduler-tooltip/scheduler-tooltip.component';

type SelectedAppointment = { data: Record<string, any>, target: any };

@Component({
  templateUrl: './planning-scheduler.component.html',
  styleUrls: ['./planning-scheduler.component.scss'],
  providers: [DataService],
  imports: [
    ApplyPipeDirective,
    DxCalendarModule,
    DxButtonModule,
    DxSchedulerModule,
    DxSpeedDialActionModule,
    DxTooltipModule,
    CommonModule,
    CalendarListComponent,
    LeftSidePanelComponent,
    RightSidePanelComponent,
    AgendaComponent,
    SchedulerTooltipComponent,
  ]
})
export class PlanningSchedulerComponent implements OnInit {
  @ViewChild('schedulerRef', { static: false }) schedulerRef: DxSchedulerComponent;

  @ViewChild('tooltipRef', { static: false }) tooltipRef: DxTooltipComponent;

  private service = inject(DataService);

  protected screen = inject(ScreenService);

  tasks: DataSource<Task> = new DataSource([]);

  currentDate = new Date();

  currentView: DxSchedulerTypes.ViewType = 'workWeek';

  isRightPanelOpen = false;

  listDataSource = [];

  resourcesList = [];

  selectedAppointment: SelectedAppointment = null;

  agendaItems: AgendaItem[] = [];

  isXSmall = this.screen.sizes['screen-small'];

  schedulerCurrentDate: Date = this.currentDate;

  constructor() {
    this.service.getDefaultListDS().subscribe(
   (data) => {
     this.listDataSource = data;
     this.resourcesList = data.reduce((res: Record<string,any>[], calendarList) => res.concat(calendarList.items), []);
      });

    this.screen.screenChanged.subscribe(({isXSmall}) => {
      this.isXSmall = isXSmall;
      this.repaintScheduler();
    });
  }

  ngOnInit(): void {
    this.service.getSchedulerTasks().subscribe((data) => {
      this.tasks = new DataSource(data);
      this.repaintScheduler();
    })
  }

  onCalendarDateChange = (date) => {
    this.currentDate = date;
    this.updateAgenda({ startDate: this.currentDate });
    this.repaintScheduler();
  };

  getSchedulerCurrentDate = (currentDate) => {
    const schedulerInstance = this.schedulerRef?.instance;
    const startViewDate = schedulerInstance?.getStartViewDate();
    const endViewDate = schedulerInstance?.getEndViewDate();

    if (this.schedulerCurrentDate.getMonth() !== currentDate.getMonth() ||
      startViewDate && startViewDate > currentDate ||
      endViewDate && endViewDate < currentDate
    ) {
      this.schedulerCurrentDate = currentDate;
    }

    return this.schedulerCurrentDate;
  }

  onSchedulerOptionChanged(e: DxSchedulerTypes.OptionChangedEvent) {
    if (e.name === 'currentView') {
      this.onCurrentViewChange(e.value);
    }
  }
  onCurrentViewChange = (view: DxSchedulerTypes.ViewType) => {
    this.currentView = view;

    if (this.currentView === 'month' && !this.screen.sizes['screen-x-small']) {
      this.isRightPanelOpen = true;
      this.updateAgenda({ startDate: this.currentDate });
    }

    this.repaintScheduler();
  }

  onSelectedDateChange = (e?: Date) => {
    const date = e instanceof Date ? e : new Date();
    this.currentDate = date;
    this.selectedAppointment = { data: { startDate: date }, target: undefined };
    this.updateAgenda({ startDate: date });
  }

  onCellClick = ({cellData}) => {
    this.onSelectedDateChange(cellData.startDate);

    if (this.currentView === 'month' && cellData) {
      const cellAppointments = this.findAllAppointmentsForDay(cellData);

      if (cellAppointments.length > 1) {
        this.selectedAppointment = { data: cellData, target: null };
        this.agendaItems = cellAppointments;
        this.toggleRightPanelOpen(true);
      }
    }
  };

  calendarListChanged(selectedCalendars) {
    const filters = selectedCalendars
      .flatMap((calendar) => [['calendarId', '=', calendar.id], 'or']).slice(0, -1);

    this.tasks?.filter(filters.length > 0 ? filters : null);

    this.tasks?.load();
    this.updateAgenda({ startDate: this.currentDate });
  }

  repaintScheduler() {
    setTimeout(() => this.schedulerRef?.instance.repaint(), 0);
  }

  getTooltipPosition = (selectedAppointment: SelectedAppointment, rightPanelOpen: boolean, isXSmall: boolean) => {
    if (isXSmall) {
      return 'bottom';
    }
    const classList = selectedAppointment?.target?.classList || selectedAppointment?.target?.[0]?.classList;
    return classList?.contains('dx-list') && rightPanelOpen ? 'left' : 'top';
  }

  toggleRightPanelOpen(isOpen?) {
    this.isRightPanelOpen = isOpen || !this.isRightPanelOpen;
    this.repaintScheduler();
  }

  showAppointmentCreationForm(appointment?) {
    this.schedulerRef?.instance.showAppointmentPopup(appointment?.data, !appointment);
  }

  findAllAppointmentsForDay = (selectedAppointment) => {
    if (!this.tasks) {
      return [];
    }
    const appointments = this.tasks.items();
    if (appointments.length === 0 || !selectedAppointment) {
      return [];
    }
    return appointments
      .filter((appointment) => {
        return appointment.startDate.getDate() === selectedAppointment.startDate.getDate()
          && appointment.startDate.getMonth() === selectedAppointment.startDate.getMonth();
      });
  }

  updateAgenda = (appointmentData?) => {
    this.agendaItems = this.findAllAppointmentsForDay(appointmentData);
  }

  onAppointmentClick(e) {
    const appointmentData = e.appointmentData;
    this.selectedAppointment = { data: appointmentData, target: e.targetElement };

    if (this.currentView === 'month') {
      this.updateAgenda(appointmentData);
      this.toggleRightPanelOpen(true);
    }
  }

  onAppointmentTooltipShowing = (e) => {
    e.cancel = true;
    const appointmentData = e.appointments[0].appointmentData;
    const isAppointmentCollectorClicked = (e) => {
      return e.targetElement?.[0]?.classList.contains('dx-scheduler-appointment-collector');
    };

    this.selectedAppointment = { data: appointmentData, target: e.targetElement };

    if (this.currentView === 'month' || isAppointmentCollectorClicked(e)) {
      this.updateAgenda(appointmentData);
    }

    if (this.currentView === 'month' && this.screen.sizes['screen-small'] ||
        isAppointmentCollectorClicked(e)) {
      this.toggleRightPanelOpen(true);
    }
    else {
      this.tooltipRef?.instance.show();
    }
  }

  showAppointmentTooltip = (e) => {
    this.schedulerRef?.instance.showAppointmentTooltip(e.itemData, e.element);
  };

  editSelectedAppointment() {
    this.showAppointmentCreationForm(this.selectedAppointment);
    this.tooltipRef?.instance.hide();
  }

  deleteSelectedAppointment(appointmentData) {
    this.schedulerRef?.instance.deleteAppointment(this.selectedAppointment?.data);
    this.tooltipRef?.instance.hide();
    this.agendaItems = this.findAllAppointmentsForDay(appointmentData)
  }
}
