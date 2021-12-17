const axios = require('axios');

const baseUrl = 'https://js.devexpress.com/Demos/RwaService/api/';

export const getContacts = async () => {
    return (await axios.get(`${baseUrl}Users/Contacts`)).data;
};

export const getContact = async (id) => {
    return (await axios.get(`${baseUrl}Users/Contacts/${id}`)).data;
};