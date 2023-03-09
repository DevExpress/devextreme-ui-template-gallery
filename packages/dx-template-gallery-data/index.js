const axios = require('axios');

const baseUrl = 'https://js.devexpress.com/Demos/RwaService/api';

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

function getSecondsToday() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return now - today;
}

const DAY_TIME_IN_MS = 24 * 60 * 60 * 1000;
const promptDescription = `The HtmlEditor component is a client-side WYSIWYG text editor. 
The editor allows users to format text and integrate media elements into documents. 
The result can be exported to HTML or Markdown.`;

export const patchTasksForScheduler = (tasks) => {
  const today = new Date();
  const mondayMidnight = today - getSecondsToday();
  const uniqueTasks = tasks.slice(0, 11);
  return uniqueTasks.map((task, index) => {
    const weekDay = (index % 4) + 1;
    // const weekDay = Math.random() * 5;

    const weekIndex = Math.ceil(index / 4) - 1;
    const taskDate = mondayMidnight + weekDay * DAY_TIME_IN_MS + weekIndex * 7 * DAY_TIME_IN_MS;
    const taskStart = taskDate + (10 + weekDay) * 3600 * 1000;
    return {
      ...task,
      startDate: new Date(taskStart),
      endDate: new Date(taskStart + 3 * 3600 * 1000),
      description: promptDescription,
    };
  });
};
