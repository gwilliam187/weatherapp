import _ from 'lodash';

import { selectCity, unselectCity } from './cityActions';
import { fetchWeather } from './weatherActions';
import { schema } from '../Schema';

//RxDB Stuff Here
import * as RxDB from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));
const syncURL = '127.0.0.1:5984/';
const dbName = 'the_awesome_weather_app';

const createDatabase = async(dispatch)=>{
	const db = await RxDB.create(
		{name: dbName, adapter: 'idb', password: 'password'}
	);
	
	db.waitForLeadership().then(() => {
		document.title = '♛ ' + document.title;
	});

	const userCollection = await db.collection({
		name: 'usercollection',
		schema: schema
	})
	console.log(userCollection)
	userCollection.sync({ remote: syncURL + dbName + '/' });

	const documents = await userCollection.find().exec();
	console.log(documents);

	return db;
}

const db = createDatabase();
//console.log(db)
// --- end of RxDB stuff

// Selected City Actions
export { selectCity };
export { unselectCity };

// Weather Actions
export { fetchWeather };


export const fetchWeathersForSelectedCities = () => async (dispatch, getState) => {
	const selectedCities = getState().selectedCities;
	const promises = await selectedCities.map(async selectedCity => {
		const res = await dispatch(fetchWeather(selectedCity));
		return res;
	});

	Promise.all(promises)
		.then(res => {
			let error = {};
			const weathers = res
				.map(currRes => {
					if('status' in currRes) {
						return currRes.data
					} else {
						dispatch(unselectCity(currRes.city));
						error.city = currRes.city;
						return undefined;
					}
				})
				.filter(weather => {
					return weather !== undefined;
				});

			dispatch({
				type: 'FETCH_WEATHERS',
				payload: weathers
			});
			//setWeathers(weathers)(dispatch, getState);

			if(!_.isEmpty(error)) {
				dispatch(updateCitiesErrorMessage(error.city, 'CITY_NOT_FOUND'));
			}
		})
		.catch(err => { 
			console.log(err); 
		});
};

export const updateCitiesErrorMessage = (city, status) => {
	if(status === 'CITY_NOT_FOUND') {
		console.log('returning not found');
		return {
			type: 'CITY_NOT_FOUND',
			payload: city.cityName
		};
	} else if(status === 'INVALID_INPUT') {
		return {
			type: 'INVALID_INPUT'
		};
	}

	return {
		type: 'ALLES_GUT'
	};
};