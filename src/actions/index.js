import _ from 'lodash';

import { selectCity, unselectCity } from './cityActions';
import { fetchWeather } from './weatherActions';
import { schema } from '../Schema';

//RxDB Stuff Here
import * as RxDB from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const syncURL = 'http://192.168.200.158:5984/';
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
	// userCollection.insert({
	// 	_id: 'Steven',
	// 	cities: [
	// 		{
	// 			cityName: "Bogor",
	// 			cityRef: "bogor,id"
	// 		},
	// 		{
	// 			cityName: "Jakarta",
	// 			cityRef: "jakarta,id"
	// 		},
	// 		{
	// 			cityName: "Potsdam",
	// 			cityRef: "Potsdam,de"
	// 		},
	// 		{
	// 			cityName: "Soest",
	// 			cityRef: "Soest,de"
	// 		}
	// 	]
	// })
	userCollection.sync({ remote: syncURL + dbName + '/' });
	db.usercollection.find({_id: {$eq: 'John'}}).exec().then(
		document=>console.log(document)
	)
	// GET ONE USER

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
		const res = await dispatch(fetchWeather(selectedCity.cityRef));
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
						// dispatch(unselectCity(currRes.city));
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
		return {
			type: 'CITY_NOT_FOUND'
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