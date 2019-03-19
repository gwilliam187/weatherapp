import axios from 'axios';

export default axios.create({
	baseURL: 'http://api.openweathermap.org/data/2.5/weather',
	params: {
		units: 'metric',
		APPID: '4d7af40322905c50c7b0301437e23b21'
	}
})