import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://192.168.2.13:4000'
});
export default instance
