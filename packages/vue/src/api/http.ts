import axios from 'axios';

export default axios.create({
  baseURL: 'https://js.devexpress.com/Demos/RwaService/api',
  headers: {
    'Content-type': 'application/json',
  },
});
