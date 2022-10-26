const axios = require('axios');
const lodash = require('lodash');

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

export const getTasks = async () => await getData('Employees/Tasks');
export const getTask = async (id) => await getData(`Employees/Tasks/${id}`);

export const getSalesByStateAndCity = async (startDate, endDate) => await getData(`Analytics/SalesByStateAndCity/${startDate}/${endDate}`);

export const getOpportunitiesByCategory = async (startDate, endDate) => await getData(`Analytics/OpportunitiesByCategory/${startDate}/${endDate}`);

export const getSalesByCategory = async (startDate, endDate) => await getData(`Analytics/SalesByCategory/${startDate}/${endDate}`);

export const getSalesByOrderDate = async (groupByPeriod) => await getData(`Analytics/SalesByOrderDate/${groupByPeriod}`);

export const getSales = async (startDate, endDate) => await getData(`Analytics/Sales/${startDate}/${endDate}`);

export const getSalesByState = (data) => {
  const dataByState = lodash.chain(data)
    .groupBy((s) => s.stateName)
    .map((val) => {
      let total = 0;
      let percentage = 0;
      val.forEach((v) => {
        total += v.total;
        percentage += v.percentage;
      });

      return {
        stateName: val[0].stateName,
        stateCoords: val[0].stateCoords,
        total,
        percentage,
      };
    })
    .value();

  return dataByState;
};
