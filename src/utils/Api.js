import Axios from 'axios';

const baseURL = 'http://43.201.85.197';

const api = Axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;