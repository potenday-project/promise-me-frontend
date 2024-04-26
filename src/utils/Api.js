import Axios from 'axios';

const api = Axios.create({
	baseURL: import.meta.env.VITE_BASEURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default api;