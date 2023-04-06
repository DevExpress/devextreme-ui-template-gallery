/* eslint-disable spellcheck/spell-checker */
const axios = require('axios');
const luxon = require('luxon');

const baseUrl = 'https://js.devexpress.com/Demos/RwaService/api';

const DateTime = luxon.DateTime;
const promptDescription = `The HtmlEditor component is a client-side WYSIWYG text editor. 
The editor allows users to format text and integrate media elements into documents. 
The result can be exported to HTML or Markdown.`;

const getData = async (url) => (await axios.get(`${baseUrl}/${url}`)).data;
const getContactOpportunities = async (id, active) => {
  const opportunities = await getData(`Users/Contacts/${id}/Opportunities`);
  return opportunities.filter((_, i) => {
    const isEven = i % 2 === 0;
    return active ? isEven : !isEven;
  });
};

export const getContacts = async () => await getData('Users/Contacts');
export const getContact = async (id) => await getData(`Users/Contacts/${id}`);
export const getContactNotes = async (id) => await getData(`Users/Contacts/${id}/Notes`);
export const getContactMessages = async (id) => await getData(`Users/Contacts/${id}/Messages`);
export const getStatuses = async () => {
  const statuses = await getData('Users/Statuses');

  statuses.unshift({
    text: 'All Contacts',
    status: '',
  });

  return statuses;
};
export const getRawStatuses = async () => await getData('Users/Statuses');
export const getStates = async () => await getData('Users/States');
export const getActiveContactOpportunities = async (id) => await getContactOpportunities(id, true);
export const getClosedContactOpportunities = async (id) => await getContactOpportunities(id, false);

export const getTasks = async () => await getData('Employees/AllTasks');
export const getFilteredTasks = async () => await getData('Employees/FilteredTasks');
export const getTask = async (id) => await getData(`Employees/Tasks/${id}`);

export const getOpportunitiesByCategory = async (startDate, endDate) => await getData(`Analytics/OpportunitiesByCategory/${startDate}/${endDate}`);
export const getSalesByCategory = async (startDate, endDate) => getData(`Analytics/SalesByCategory/${startDate}/${endDate}`);
export const getSales = async (startDate, endDate) => getData(`Analytics/Sales/${startDate}/${endDate}`);
export const getSalesByStateAndCity = async (startDate, endDate) => getData(`Analytics/SalesByStateAndCity/${startDate}/${endDate}`);
export const getSalesByOrderDate = async (groupByPeriod) => getData(`Analytics/SalesByOrderDate/${groupByPeriod}`);
export const calcSalesByState = (sales) => Object.values(sales.reduce((res, item) => {
  const state = res[item.stateName] || {
    stateName: item.stateName,
    stateCoords: item.stateCoords,
    total: 0,
    percentage: 0,
  };

  state.total += item.total;
  state.percentage += item.percentage;
  res[item.stateName] = state;
  return res;
}, {}));

export const getSalesByState = async (startDate, endDate) => {
  const data = await getSalesByStateAndCity(startDate, endDate);

  return calcSalesByState(data);
};

export const patchTasksForScheduler = (tasks) => {
  const today = DateTime.now();
  const mondayMidnight = today.set({
    weekday: 1, hour: 0, minute: 0, millisecond: 0,
  });

  const uniqueTasks = tasks.slice(0, 11);
  return uniqueTasks.map((task, index) => {
    const weekDay = (index % 4);

    const weekIndex = Math.ceil(index / 4) - 1;
    const taskStart = mondayMidnight.plus({
      days: weekDay + weekIndex * 7,
      hours: 7 + weekDay,
    });
    return {
      ...task,
      startDate: taskStart.toJSDate(),
      endDate: taskStart.plus({ hours: 3 }).toJSDate(),
      description: promptDescription,
      calendarId: weekDay,
    };
  });
};

export const getTasksForScheduler = async () => patchTasksForScheduler(await getTasks());

export const defaultCalendarListItems = [
  {
    key: 'My Calendars',
    items: [
      {
        id: 0,
        text: 'Brett Johnson',
        color: '#E1F5FE',
        checkboxColor: '#29B6F6',
      },
      {
        id: 1,
        text: 'Tasks',
        color: '#C8E6C9',
        checkboxColor: '#66BB6A',
      },
      {
        id: 2,
        text: 'Reminder',
        color: '#FFCDD2',
        checkboxColor: '#EF5350',
      },
      {
        id: 3,
        text: 'Contacts',
        color: '#FFE0B2',
        checkboxColor: '#FFA726',
      }],
  },
  {
    key: 'Other Calendars',
    items: [{
      id: 4,
      text: 'Holidays',
      color: '#F3E5F5',
      checkboxColor: '#AB47BC',
    }],
  },
];
