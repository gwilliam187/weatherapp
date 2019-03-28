import _ from 'lodash';

import { addCity } from './cityActions';
import { selectCity, unselectCity } from './selectedCityActions';
import { fetchWeather, setWeathers } from './weatherActions';
import { updateCitiesErrorMessage } from './citiesErrorMessageActions';

import { schema } from '../Schema';

//RxDB Stuff Here
import * as RxDB from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const syncURL = 'http://192.168.200.46:5984/';
const dbName = 'the_awesome_weather_app';

export const createDB = async()=>{
	const db = await RxDB.create(
		{name: dbName, adapter: 'idb', password: 'password'}
	);
	
	db.waitForLeadership().then(() => {
		document.title = '♛ ' + document.title;
	});

	return db;
}

export const userCollection = async(db)=>{
	const userCollection = await db.collection({
		name: 'usercollection',
		schema: schema
	})
	userCollection.sync({ remote: syncURL + dbName + '/' });

	return db.usercollection;
}

export const initialiseRxDB = () => async (dispatch, getState)=>{
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
	const db = await createDB();
	const usercollection = await userCollection(db);

	usercollection.find().$.subscribe( users => {
		if	(!users){
			return;
		}
		let userList = [];
		users.forEach((user)=>{
			userList.push(user.get('_id'))
		})
		dispatch({type: "INITIALISE_USERS", payload: userList})
	} );

	let cities = await usercollection.findOne({_id: {$eq: "Steven"/*getState().users*/}}).exec();
	dispatch(addCity(cities))
	//return db;
}
// --- end of RxDB stuff

// Selected City Actions
// export { selectCity, unselectCity };

// Weather Actions
export { fetchWeather, setWeathers };

// Cities Error Message Actions
export { updateCitiesErrorMessage };


export const fetchWeathersForSelectedCities = () => async (dispatch, getState) => {
	const selectedCities = getState().selectedCities;
	const promises = await selectedCities.map( selectedCity => {
		const res = dispatch(fetchWeather(selectedCity));
		return res;
	});

	Promise.all(promises)
		.then(res => {
			let error = {};
			const weathers = res
				.map(currRes => {
					console.log(currRes);
					if('status' in currRes) {
						return currRes.data
					} else {
						console.log(currRes);
						dispatch(unselectCity(currRes.city));
						error.city = currRes.city;
						return undefined;
					}
				})
				.filter(weather => {
					return weather !== undefined;
				});

			dispatch(setWeathers(weathers));

			if(!_.isEmpty(error)) {
				dispatch(updateCitiesErrorMessage(error.city, 'CITY_NOT_FOUND'));
			}
		})
		.catch(err => { 
			console.log(err); 
		});
};