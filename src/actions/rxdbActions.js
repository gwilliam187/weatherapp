import * as RxDB from 'rxdb';


import { addCity } from './cityActions';
import { schema } from '../Schema';

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

export const userCollection = async()=>{
	const db = await createDB();
	const userCollection = await db.collection({
		name: 'usercollection',
		schema: schema
	})
	userCollection.sync({ remote: syncURL + dbName + '/' });

	return db.usercollection;
}

export const loadUsers= () => async (dispatch, getState)=>{
	const usercollection = await userCollection();

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
}

export const loadWeatherForSelectedUser = () => async (dispatch, getState) => {
	const usercollection = await userCollection();
	let cities = await usercollection.findOne({_id: {$eq: "Steven"/*getState().users*/}}).exec();
	dispatch(addCity(cities))
}

//This function below is not quite ready yet, update should be used instead of insert
export const updateCityToUser = () => async (dispatch, state) =>{
	const usercollection = await userCollection();
	userCollection.insert({
		_id: 'Steven',
		cities: [
			{
				cityName: "Bogor",
				cityRef: "bogor,id"
			},
			{
				cityName: "Jakarta",
				cityRef: "jakarta,id"
			},
			{
				cityName: "Potsdam",
				cityRef: "Potsdam,de"
			},
			{
				cityName: "Soest",
				cityRef: "Soest,de"
			}
		]
	})

	//The reassignment below calls sync, reassignment does not change anything
	usercollection = await userCollection();
	let cities = await usercollection.findOne({_id: {$eq: "Steven"/*getState().users*/}}).exec();
	dispatch(addCity(cities))
}