import { useRef, useState, useCallback, useMemo } from 'react';
import Tooltip, { Position } from 'devextreme-react/tooltip';
import Scheduler from 'devextreme-react/scheduler';
import { ViewType } from 'devextreme/ui/scheduler';
import DataSource from 'devextreme/data/data_source';
import { useScreenSize } from '../../utils/media-query';
import { findAllAppointmentsForDay } from './utils';

export const useSchedulerLogic = () => {
  const { isXSmall, isLarge } = useScreenSize();
  const tooltipRef = useRef<Tooltip>(null);
  const schedulerRef = useRef<Scheduler>(null);

  const [agendaItems, setAgendaItems] = useState<{ startDate: Date }[]>();
  const [currentView, setCurrentView] = useState<ViewType>('week');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{ data, target }>();
  const [tasks, setTasks] = useState<DataSource>();

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

  const onCurrentViewChange = useCallback((view) => { setCurrentView(view); }, [setCurrentView]);

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
  }, [currentView, rightPanelOpen, updateAgenda]);

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

  }, [currentView, isXSmall, rightPanelOpen, tasks]);

  const onCellModified = useCallback((e) => {
    if (e.appointmentData.startDate.toDateString() === selectedAppointment?.data.startDate.toDateString()) {
      updateAgenda(e.appointmentData);
    }
  }, [selectedAppointment, tasks]);

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
  }, [currentView, rightPanelOpen, tasks, selectedAppointment]);

  return {
    agendaItems,
    currentView,
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
    onCellModified,
    onCellClick,
    updateAgenda,
    setAgendaItems,
    setTasks,
    toggleRightPanelOpen,
  };
};
