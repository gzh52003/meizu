import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://12' : 'http://localhost:2003'
const request = axios.create({
	baseURL: baseUrl + '/api'
});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request;
