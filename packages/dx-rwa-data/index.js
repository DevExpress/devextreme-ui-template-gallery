const axios = require('axios');

const baseUrl = 'https://js.devexpress.com/Demos/RwaService/api';

const getData = async (url) => (await axios.get(`${baseUrl}/${url}`)).data;

export const getContacts = async () => await getData('Users/Contacts');
export const getContact = async (id) => await getData(`Users/Contacts/${id}`);
export const getContactOpportunities = async (id) => await getData(`Users/Contacts/${id}/Opportunities`);
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
