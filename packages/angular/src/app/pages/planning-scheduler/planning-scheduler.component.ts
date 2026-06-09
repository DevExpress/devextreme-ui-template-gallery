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

type SchedulerAppointmentData = {
  startDate?: Date | string | number;
  [key: string]: unknown;
};

type SelectedAppointment = { data: SchedulerAppointmentData; target: unknown };

type AgendaDateRef = { startDate?: Date | string | number };

function getTargetClassList(target: unknown): DOMTokenList | undefined {
  if (target instanceof HTMLElement) {
    return target.classList;
  }
  if (Array.isArray(target) && target[0] instanceof HTMLElement) {
    return target[0].classList;
  }
  return undefined;
}

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
  @ViewChild('schedulerRef', { static: false }) schedulerRef!: DxSchedulerComponent;

  @ViewChild('tooltipRef', { static: false }) tooltipRef!: DxTooltipComponent;

  private service = inject(DataService);

  protected screen = inject(ScreenService);

  tasks: DataSource<Task> = new DataSource<Task>([]);

  currentDate = new Date();

  currentView: DxSchedulerTypes.ViewType = 'workWeek';

  isRightPanelOpen = false;

  listDataSource: Record<string, unknown>[] = [];

  resourcesList: Record<string, unknown>[] = [];

  selectedAppointment: SelectedAppointment | null = null;

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
      this.tasks = new DataSource<Task>(data as Task[]);
      this.repaintScheduler();
    })
  }

  onCalendarDateChange = (date: Date) => {
    this.currentDate = date;
    this.updateAgenda({ startDate: this.currentDate });
    this.repaintScheduler();
  };

  getSchedulerCurrentDate = (currentDate: Date) => {
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

  onCellClick = ({ cellData }: { cellData: { startDate: Date } }) => {
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

  calendarListChanged(selectedCalendars: Array<{ id: number }>) {
    const filters = selectedCalendars
      .flatMap((calendar: { id: number }) => [['calendarId', '=', calendar.id], 'or']).slice(0, -1);

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
    const classList = getTargetClassList(selectedAppointment?.target);
    return classList?.contains('dx-list') && rightPanelOpen ? 'left' : 'top';
  }

  toggleRightPanelOpen(isOpen?: boolean) {
    this.isRightPanelOpen = isOpen ?? !this.isRightPanelOpen;
    this.repaintScheduler();
  }

  showAppointmentCreationForm(appointment?: SelectedAppointment | null) {
    this.schedulerRef?.instance.showAppointmentPopup(
      appointment?.data as Parameters<DxSchedulerComponent['instance']['showAppointmentPopup']>[0],
      !appointment,
    );
  }

  findAllAppointmentsForDay = (selectedAppointment?: AgendaDateRef) => {
    if (!this.tasks || !selectedAppointment?.startDate) {
      return [];
    }
    const selectedDate = new Date(selectedAppointment.startDate);
    const appointments = this.tasks.items();
    if (appointments.length === 0) {
      return [];
    }
    return appointments
      .filter((appointment) => {
        const startDate = new Date(appointment.startDate);
        return startDate.getDate() === selectedDate.getDate()
          && startDate.getMonth() === selectedDate.getMonth();
      });
  }

  updateAgenda = (appointmentData?: AgendaDateRef) => {
    this.agendaItems = this.findAllAppointmentsForDay(appointmentData);
  }

  onAppointmentClick(e: DxSchedulerTypes.AppointmentClickEvent) {
    const appointmentData = e.appointmentData;
    const target = (e as DxSchedulerTypes.AppointmentClickEvent & { targetElement?: unknown }).targetElement;
    this.selectedAppointment = { data: appointmentData, target };

    if (this.currentView === 'month') {
      this.updateAgenda({ startDate: appointmentData.startDate });
      this.toggleRightPanelOpen(true);
    }
  }

  onAppointmentTooltipShowing = (e: DxSchedulerTypes.AppointmentTooltipShowingEvent) => {
    e.cancel = true;
    const appointmentData = e.appointments[0].appointmentData;
    const isAppointmentCollectorClicked = (event: DxSchedulerTypes.AppointmentTooltipShowingEvent) => {
      const target = event.targetElement;
      const element = Array.isArray(target) ? target[0] : target;
      return (element as HTMLElement | undefined)?.classList?.contains('dx-scheduler-appointment-collector');
    };

    this.selectedAppointment = { data: appointmentData, target: e.targetElement };

    if (this.currentView === 'month' || isAppointmentCollectorClicked(e)) {
      this.updateAgenda({ startDate: appointmentData.startDate });
    }

    if (this.currentView === 'month' && this.screen.sizes['screen-small'] ||
        isAppointmentCollectorClicked(e)) {
      this.toggleRightPanelOpen(true);
    }
    else {
      this.tooltipRef?.instance.show();
    }
  }

  showAppointmentTooltip = (e: { itemData: Task; element: EventTarget }) => {
    this.schedulerRef?.instance.showAppointmentTooltip(
      e.itemData as Parameters<DxSchedulerComponent['instance']['showAppointmentTooltip']>[0],
      e.element as Element,
    );
  };

  editSelectedAppointment() {
    this.showAppointmentCreationForm(this.selectedAppointment);
    this.tooltipRef?.instance.hide();
  }

  deleteSelectedAppointment(appointmentData: AgendaDateRef) {
    const appointment = this.selectedAppointment?.data;
    if (appointment) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.schedulerRef?.instance.deleteAppointment(appointment as any);
    }
    this.tooltipRef?.instance.hide();
    this.agendaItems = this.findAllAppointmentsForDay(appointmentData)
  }
}
