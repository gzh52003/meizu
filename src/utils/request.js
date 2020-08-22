import axios from 'axios';


const request = axios.create({
	baseURL: 'http://47.112.180.216:2003/api',
	headers:{"Content-Type":"application/json"}
});

export default request;
