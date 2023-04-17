import { useRef, useState, useCallback, useMemo, useEffect } from 'react';

import Tooltip from 'devextreme-react/tooltip';
import Scheduler from 'devextreme-react/scheduler';
import { ViewType } from 'devextreme/ui/scheduler';
import DataSource from 'devextreme/data/data_source';

import { getTasksForScheduler } from 'dx-template-gallery-data';
import { useScreenSize } from '../../utils/media-query';
import { findAllAppointmentsForDay } from './utils';

export const useSchedulerLogic = () => {
  const { isXSmall, isLarge } = useScreenSize();
  const tooltipRef = useRef<Tooltip>(null);
  const schedulerRef = useRef<Scheduler>(null);

  const [agendaItems, setAgendaItems] = useState<{ startDate: Date }[]>();
  const [currentView, setCurrentView] = useState<ViewType>('workWeek');
  const [date, setDate] = useState(new Date());
  const [rightPanelOpen, setRightPanelOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{ data, target }>();
  const [tasks, setTasks] = useState<DataSource>();

  useEffect(() => {
    getTasksForScheduler().then(tasksList => {
      setTasks(new DataSource(tasksList));
    });
  }, []);
  useEffect(() => {
    if (tasks) {
      setAgendaItems(findAllAppointmentsForDay({ startDate: date }, tasks));
    }
  }, [tasks]);

  const tooltipPosition: 'left' | 'right' | 'top' | 'bottom' = useMemo(() => {
    if (isXSmall) {
      return 'bottom';
    }
    const classList = selectedAppointment?.target?.classList || selectedAppointment?.target?.[0]?.classList;
    return classList?.contains('dx-list') && rightPanelOpen ? 'left' : 'top';
  }, [selectedAppointment, rightPanelOpen, isXSmall]);

  const toggleRightPanelOpen = useCallback(() => {
    setRightPanelOpen(!rightPanelOpen);
    if (isLarge) {
      schedulerRef.current?.instance.repaint();
    }
  }, [rightPanelOpen]);

  const onCurrentViewChange = useCallback((view) => {
    if (view === 'month' && !isXSmall) {
      setRightPanelOpen(true);
    }
    setCurrentView(view);
  }, [setCurrentView]);

  const createAppointment = useCallback(() => {
    schedulerRef.current?.instance.showAppointmentPopup();
  }, [schedulerRef]);

  const deleteCurrentAppointment = useCallback(() => {
    schedulerRef.current?.instance.deleteAppointment(selectedAppointment?.data);
    tooltipRef.current?.instance.hide();
  }, [selectedAppointment]);

  const editCurrentAppointment = useCallback(() => {
    schedulerRef.current?.instance.showAppointmentPopup(selectedAppointment?.data, false);
    tooltipRef.current?.instance.hide();
  }, [selectedAppointment]);

  const updateAgenda = useCallback((appointmentData) => {
    setAgendaItems(findAllAppointmentsForDay(appointmentData, tasks));
  }, [tasks]);

  const onAppointmentClick = useCallback((e) => {
    if (currentView === 'month' && !rightPanelOpen) {
      const appointmentData = e.appointmentData;
      setSelectedAppointment({ data: appointmentData, target: e.targetElement });
      updateAgenda(appointmentData);
      toggleRightPanelOpen();
    }
  }, [currentView, rightPanelOpen, updateAgenda, toggleRightPanelOpen]);

  const onAppointmentTooltipShowing = useCallback((e) => {
    e.cancel = true;
    const appointmentData = e.appointments[0].appointmentData;

    const isAppointmentCollectorClicked = (e) => {
      return e.targetElement?.[0]?.classList.contains('dx-scheduler-appointment-collector');
    };

    setSelectedAppointment({ data: appointmentData, target: e.targetElement });

    if (currentView === 'month' || isAppointmentCollectorClicked(e)) {
      updateAgenda(appointmentData);
    }
    if ((currentView === 'month' && isXSmall ||
      isAppointmentCollectorClicked(e)) &&
      !rightPanelOpen) {
      toggleRightPanelOpen();
    }
    else {
      tooltipRef.current?.instance.show();
    }

  }, [currentView, isXSmall, rightPanelOpen, updateAgenda, toggleRightPanelOpen]);

  const onSelectedCalendarsChange = useCallback((seletedCalendars) => {
    const removedResourceFilters = seletedCalendars
      .map((calendar) => calendar.id);

    tasks?.filter((task) => {
      return !removedResourceFilters.includes(task.calendarId);
    });

    tasks?.load().then(() => { updateAgenda(selectedAppointment?.data); });
  }, [tasks, selectedAppointment, updateAgenda]);

  const onSelectedDateChange = useCallback((e) => {
    const date = e instanceof Date ? e : new Date();
    setDate(date);
    setSelectedAppointment({ data: { startDate: date }, target: undefined });
    updateAgenda({ startDate: date });
  }, [rightPanelOpen, updateAgenda, setSelectedAppointment]);

  const onAppointmentModified = useCallback((e) => {
    if (e.appointmentData.startDate.toDateString() === selectedAppointment?.data.startDate.toDateString()) {
      updateAgenda(e.appointmentData);
    }
  }, [selectedAppointment, updateAgenda]);

  const showAppointmentTooltip = useCallback((e) => {
    schedulerRef.current?.instance.showAppointmentTooltip(e.itemData, e.element);
  }, [schedulerRef]);

  const onCellClick = useCallback((e) => {
    if (currentView === 'month' && e.cellData) {
      const cellAppointments = findAllAppointmentsForDay(e.cellData, tasks);
      if (cellAppointments.length > 1) {
        setSelectedAppointment({ data: e.cellData, target: null });
        setAgendaItems(cellAppointments);
        if (!rightPanelOpen) {
          toggleRightPanelOpen();
        }
      }
    }
  }, [currentView, rightPanelOpen, tasks, selectedAppointment, toggleRightPanelOpen]);

  return {
    agendaItems,
    currentView,
    date,
    rightPanelOpen,
    schedulerRef,
    selectedAppointment,
    tasks,
    tooltipPosition,
    tooltipRef,
    createAppointment,
    deleteCurrentAppointment,
    editCurrentAppointment,
    onCurrentViewChange,
    onAppointmentClick,
    onAppointmentTooltipShowing,
    onAppointmentModified,
    onCellClick,
    onSelectedDateChange,
    onSelectedCalendarsChange,
    showAppointmentTooltip,
    toggleRightPanelOpen,
  };
};
