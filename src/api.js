import axios from 'axios'
axios.defaults.credentials = true;

const API = axios.create({
  baseURL: 'http://api.p2.test:8000',
  headers: {'X-Custom-Header': 'foobar'},
  withCredentials: true
});

export default API