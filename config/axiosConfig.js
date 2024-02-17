import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://192.168.137.1:4000'
});
export default instance
