import * as RxDB from 'rxdb';


import { initialiseCity } from './cityActions';
import { schema } from '../Schema';

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const syncURL = 'http://192.168.200.46:5984/';
const dbName = 'the_awesome_weather_app';

export const createDB = async()=>{
	const db = await RxDB.create({   
            name: dbName, adapter: 'idb', 
            password: 'password',
            ignoreDuplicate: true
        }
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
    
    // let cities = await usercollection.findOne({_id: {$eq: 'John'}}).exec();
    // cities = cities.get("cities");
	// dispatch(initialiseCity(cities));
}

export const loadWeatherForSelectedUser = () => async (dispatch, getState) => {
	const usercollection = await userCollection();
    let cities = await usercollection.findOne({_id: {$eq: getState().users}}).exec();
    cities = cities.get("cities");
	dispatch(initialiseCity(cities));
}

//This function below is not quite ready yet, update should be used instead of insert
export const updateCityToUser = () => async (dispatch, getState) =>{
	let usercollection = await userCollection();
    /*
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
    */
    const dummyCities = [
        {
            cityName: "Frankfurt",
            cityRef: "frankfurt,de"
        },
        {
            cityName: "Bandung",
            cityRef: "bandung,id"
        }
    ]
    let userDocument = await usercollection.findOne({_id: {$eq: "Steven"/*getState().users*/}}).exec();
    await userDocument.update({
        $set:{
            cities: dummyCities//getState().cities
        }
    })
	//The reassignment below calls sync, reassignment does not change anything
    usercollection = await userCollection();
    let cities = userDocument.get("cities");
	dispatch(initialiseCity(cities));
}