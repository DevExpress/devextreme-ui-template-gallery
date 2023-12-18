<template>
  <div class="planning-scheduler">
    <div class="view-wrapper">
      <div class="panels">
        <left-side-panel class="left-side-panel">
          <div class="left-side-panel-content">
            <div class="buttons">
              <dx-button
                text="Today"
                @click="onSelectedDateChange"
              />
              <dx-button
                text="Create event"
                type="default"
                @click="() => showAppointmentCreationForm()"
              />
            </div>
            <div class="calendar">
              <dx-calendar
                :value="currentDate"
                @value-changed="onCalendarDateChange"
              />
            </div>
            <calendar-list
              :data-source="defaultCalendarListItems"
              @list-selection-changed="calendarListChanged"
            />
          </div>
        </left-side-panel>

        <div class="scheduler-container">
          <dx-scheduler
            ref="schedulerRef"
            height="inherit"
            :adaptivity-enabled="!!screenInfo.isXSmall"
            :all-day-panel-mode="'hidden'"
            :data-source="tasks"
            :current-view="currentView"
            :current-date="schedulerCurrentDate"
            :start-day-hour="4"
            :show-current-time-indicator="false"
            @option-changed="onSchedulerOptionChange"
            @appointment-click="onAppointmentClick"
            @appointment-added="onAppointmentModified"
            @appointment-deleted="onAppointmentModified"
            @appointment-tooltip-showing="onAppointmentTooltipShowing"
            @appointment-form-opening="onAppointmentFormOpening"
            @cell-click="onCellClick"
          >
            <dx-resource
              field-expr="calendarId"
              label="Calendar"
              :data-source="resourcesList"
            />
            <dx-view type="day" />
            <dx-view type="workWeek" />
            <dx-view type="month" />
            <dx-view type="agenda" />
          </dx-scheduler>
          <dx-tooltip
            ref="tooltipRef"
            show-event="click"
            :target="selectedAppointment?.target"
            :position="tooltipPosition"
          >
            <scheduler-tooltip
              :selected-appointment-data="selectedAppointment?.data"
              @click-edit-appointment="editSelectedAppointment"
              @click-delete-appointment="deleteSelectedAppointment"
            />
          </dx-tooltip>
          <dx-speed-dial-action
            icon="add"
            :visible="screenInfo.isXSmall"
            @click="() => showAppointmentCreationForm()"
          />
        </div>

        <right-side-panel
          class="right-side-panel"
          :is-opened="isRightPanelOpen"
          :show-open-button="currentView === 'month'"
          :title="formatDate(agendaItems[0]?.startDate || currentDate, 'EE, MMMM d')"
          @opened-change="toggleRightPanelOpen($event)"
        >
          <agenda-list
            :items="agendaItems"
            :resources="resourcesList"
            @click-appointment="showAppointmentTooltip"
          />
        </right-side-panel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import {
  DxButton,
  DxCalendar,
  DxScheduler,
  DxSpeedDialAction,
  DxTooltip,
} from 'devextreme-vue';
import { DxView, DxResource } from 'devextreme-vue/scheduler';
import { formatDate } from 'devextreme/localization';
import { screenInfo } from '@/utils/media-query';
import LeftSidePanel from '@/components/utils/left-side-panel.vue';
import CalendarList from '@/components/utils/calendar-list.vue';
import SchedulerTooltip from '@/components/utils/scheduler-tooltip.vue';
import RightSidePanel from '@/components/utils/right-side-panel.vue';

import { defaultCalendarListItems, getTasksForScheduler } from 'dx-template-gallery-data';
import DataSource from 'devextreme/data/data_source';
import { Task } from '@/types';
import AgendaList, { AgendaItem } from '@/components/utils/agenda-list.vue';
import { DxForm } from 'devextreme-vue/form';

type AppointmentData = {startDate: Date, calendarId?: string};
type SelectedAppointment = {
  data: AppointmentData,
  target: HTMLElement | undefined };

const schedulerRef = ref<InstanceType<typeof DxScheduler>>();
const tooltipRef = ref<InstanceType<typeof DxTooltip>>();
const currentDate = ref(new Date());
const currentView = ref('workWeek');
const isRightPanelOpen = ref(false);

const tasks = ref<DataSource | null>(null);

const agendaItems = ref<AgendaItem[]>([]);

const schedulerCurrentDate = ref(new Date());

const resourcesList: Record<string, unknown>[] = defaultCalendarListItems.reduce(
  (res: Record<string, unknown>[], calendarList: {items: []}) => res.concat(calendarList.items),
  [],
);

const selectedAppointment = ref<SelectedAppointment | null>(null);
const rightPanelOpen = ref(false);

const tooltipPosition = computed(() => {
  if (screenInfo.value.isSmall) {
    return 'bottom';
  }

  const appointmentTarget = selectedAppointment.value?.target;
  const classList = (appointmentTarget as unknown as HTMLElement[])?.[0]?.classList
    || appointmentTarget?.classList;

  return classList?.contains('dx-list') && rightPanelOpen ? 'left' : 'top';
});

watchEffect(() => {
  const deps = [tasks.value, currentView.value, schedulerCurrentDate.value, isRightPanelOpen.value];
  if (deps.length) {
    setTimeout(() => schedulerRef.value?.instance?.repaint());
  }
});

watchEffect(() => {
  const schedulerInstance = schedulerRef?.value?.instance;
  const startViewDate = schedulerInstance?.getStartViewDate();
  const endViewDate = schedulerInstance?.getEndViewDate();

  if (schedulerCurrentDate.value?.getMonth() !== currentDate.value?.getMonth()
    || (startViewDate && startViewDate > currentDate.value)
    || (endViewDate && endViewDate < currentDate.value)
  ) {
    schedulerCurrentDate.value = currentDate.value;
  }
});

getTasksForScheduler().then((data: Task[]) => {
  tasks.value = new DataSource(data);
});

function toggleRightPanelOpen(isOpen?: boolean) {
  isRightPanelOpen.value = isOpen || !isRightPanelOpen.value;
}

function findAllAppointmentsForDay(selectedAppointmentData?: AppointmentData) {
  if (!tasks.value) {
    return [];
  }
  const appointments = tasks.value.items();
  if (appointments.length === 0 || !selectedAppointmentData) {
    return [];
  }
  return appointments.filter(
    (appointment) => appointment.startDate.getDate() === selectedAppointmentData.startDate.getDate()
        && appointment.startDate.getMonth() === selectedAppointmentData.startDate.getMonth(),
  );
}

function updateAgenda(appointmentData?: AppointmentData) {
  agendaItems.value = findAllAppointmentsForDay(appointmentData);
}

function onCalendarDateChange({ value }: { value: Date }) {
  currentDate.value = value;
  updateAgenda({ startDate: currentDate.value });
}

function showAppointmentCreationForm(appointment: SelectedAppointment| null) {
  schedulerRef.value?.instance.showAppointmentPopup(appointment?.data, !appointment);
}

function onSelectedDateChange(e?: Date) {
  const date = e instanceof Date ? e : new Date();
  currentDate.value = date;
  selectedAppointment.value = { data: { startDate: date }, target: undefined };
  updateAgenda({ startDate: date });
}

function calendarListChanged(selectedCalendars: {id: string}[]) {
  const filters = selectedCalendars
    .flatMap((calendar: {id: string}) => [['calendarId', '=', calendar.id], 'or']).slice(0, -1);

  tasks.value?.filter(filters.length > 0 ? filters : null);
  tasks.value?.load();
  updateAgenda({ startDate: currentDate.value });
}

function onAppointmentFormOpening(e: {form: typeof DxForm, appointmentData: AppointmentData}) {
  const editor = e.form.getEditor('calendarId');
  if (e.appointmentData.calendarId === undefined) {
    editor.option('value', 0);
  }
}

function onAppointmentModified(e: {appointmentData: AppointmentData}) {
  if (e.appointmentData.startDate.toDateString()
    === selectedAppointment.value?.data.startDate.toDateString()) {
    updateAgenda(e.appointmentData);
  }
}

function onCurrentViewChange(view: string) {
  currentView.value = view;

  if (currentView.value === 'month' && !screenInfo.value.isSmall) {
    isRightPanelOpen.value = true;
    updateAgenda({ startDate: currentDate.value });
  } else if (view !== 'month' && screenInfo.value.isLarge) {
    isRightPanelOpen.value = false;
  }
}

function onSchedulerOptionChange({ name, value }: {name: string, value: string}) {
  if (name === 'currentView') {
    onCurrentViewChange(value);
  }
}

function onAppointmentClick(e: {appointmentData: AppointmentData, targetElement: HTMLElement}) {
  const { appointmentData } = e;
  selectedAppointment.value = { data: appointmentData, target: e.targetElement };

  if (currentView.value === 'month') {
    updateAgenda(appointmentData);
    toggleRightPanelOpen(true);
  }
}

function onAppointmentTooltipShowing(
  e: {appointments: {
      appointmentData: AppointmentData }[],
    targetElement: HTMLElement,
    cancel: boolean},
) {
  e.cancel = true;

  const { appointmentData } = e.appointments[0];
  const isAppointmentCollectorClicked = ({ targetElement }: {targetElement: HTMLElement}) => (targetElement as unknown as HTMLElement[])?.[0]?.classList.contains('dx-scheduler-appointment-collector');

  selectedAppointment.value = { data: appointmentData, target: e.targetElement };

  if (currentView.value === 'month' || isAppointmentCollectorClicked(e)) {
    updateAgenda(appointmentData);
  }

  if ((currentView.value === 'month' && screenInfo.value.isSmall)
    || isAppointmentCollectorClicked(e)) {
    toggleRightPanelOpen(true);
  } else {
    tooltipRef.value?.instance.show();
  }
}

function onCellClick({ cellData }: {cellData: AppointmentData}) {
  onSelectedDateChange(cellData.startDate);

  if (currentView.value === 'month' && cellData) {
    const cellAppointments = findAllAppointmentsForDay(cellData);

    if (cellAppointments.length > 1) {
      selectedAppointment.value = { data: cellData, target: undefined };
      agendaItems.value = cellAppointments;
      toggleRightPanelOpen(true);
    }
  }
}

function showAppointmentTooltip(e: {itemData: AppointmentData, element: HTMLElement}) {
  schedulerRef.value?.instance.showAppointmentTooltip(e.itemData, e.element);
}

function editSelectedAppointment() {
  showAppointmentCreationForm(selectedAppointment.value);
  tooltipRef.value?.instance.hide();
}

function deleteSelectedAppointment(appointmentData: AppointmentData) {
  schedulerRef.value?.instance.deleteAppointment(selectedAppointment.value?.data);
  tooltipRef.value?.instance.hide();
  agendaItems.value = findAllAppointmentsForDay(appointmentData);
}
</script>

<style scoped lang="scss">
@use "@/variables.scss" as *;

@include separator();

.planning-scheduler {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;

  .view-wrapper {
    position: relative;
    flex-direction: column;
    display: flex;
    height: inherit;

    .panels {
      display: flex;
      flex-wrap: wrap;
      height: inherit;
      gap: 16px;
      padding: var(--content-padding) 0 var(--theme-padding);

      .left-side-panel-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--theme-padding);

        .buttons {
          display: flex;
          width: 100%;
          gap: 16px;
          margin-top: var(--theme-padding);
          padding: 0 var(--theme-padding);

          .dx-button {
            width: calc((100% - var(--theme-padding)) / 2);
            font-size: 13px;
            border-radius: 4px;
          }
        }

        .calendar {
          align-self: center;
          padding: var(--theme-padding) 0;

          .dx-calendar {
            width: var(--calendar-width);
          }
        }
      }

      :deep(.scheduler-container) {
        flex: 1;
        height: inherit;
        border: 1px grey;
        border-radius: 8px;

        .dx-scheduler-header {
          border-radius: 8px 8px 0 0;
          height: var(--scheduler-toolbar-height);
        }

        .dx-scheduler-appointment-content {
          color: #333;
        }

        .dx-scheduler-work-space {
          border-radius: 0 0 8px 8px;
        }
      }
    }
  }
}
</style>
