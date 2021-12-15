const axios = require('axios');

const baseUrl = 'https://localhost:5001/api/';

export const getContacts = async () => {
    return (await axios.get(`${baseUrl}Users/Contacts`)).data;
};

export const getContact = async (id) => {
    return (await axios.get(`${baseUrl}Users/Contacts/${id}`)).data;
};