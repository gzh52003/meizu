import axios from 'axios';

const baseUrl = "http://47.112.180.216:2003"
const request = axios.create({
	baseURL: baseUrl + '/api'
});

export default request;
