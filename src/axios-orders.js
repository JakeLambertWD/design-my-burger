import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://create-my-burger-e2081-default-rtdb.firebaseio.com/'
});

export default instance;
