const axios = require('axios');

const baseUrl = 'https://js.devexpress.com/Demos/RwaService/api';

const getData = async (url) => (await axios.get(`${baseUrl}/${url}`)).data;
const getContactOpportunities = async (id, active) => {
  const opportunities = await getData(`Users/Contacts/${id}/Opportunities`);
  return opportunities.filter((_, i) => (active ? (i % 2) : !(i % 2)));
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
export const getSalesByState = async (data) => await Object.values(data.reduce((res, item) => {
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
