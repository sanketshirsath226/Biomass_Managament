import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://192.168.1.6:4000'
});
export default instance