import axios from 'axios';


const request = axios.create({
	baseURL: 'http://47.112.180.216:2003/api'
});

export default request;
