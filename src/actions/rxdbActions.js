import * as RxDB from 'rxdb';

import { initialiseCity, addCity } from './cityActions';
import { schema } from '../Schema';
import axios from 'axios';

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const ipAddress = '192.168.200.134:5984';
const putURL = `http://admin:password@${ ipAddress }/`;
const syncURL = `http://${ ipAddress }/`

export const createDB = async(dbName)=>{
	const db = await RxDB.create({   
      name: dbName, adapter: 'idb', 
      password: 'password',
      ignoreDuplicate: true
    }
	);
	addCity();
	db.waitForLeadership().then(() => {
		document.title = '♛ ' + document.title;
	});

	return db;
}

export const citiesCollection = async(dbName)=>{
	const db = await createDB(dbName);
	const citiesCollection = await db.collection({
		name: 'citiescollection',
		schema: schema
	})
	//const remoteDB = "";
	//func: function(doc){ return doc.isPublic==='true'}.toString()
	//citiesCollection.sync({remote: syncURL+dbName+'/', filter: "acceptOnlyPublicCity/isPublicFilter", /*query_params: {"isPublic": true} */ live: true, retry: true});
	citiesCollection.sync({
		remote: syncURL+dbName+'/',
		waitForLeadership: true,
		direction:{
			pull: true,
			push: true
		},
		options:{
			live:true,
			retry: true
		},
		query: citiesCollection.find().where('isPublic').eq(true)
	});
	//citiesCollection.sync(dbName, syncURL+dbName+'/', {live: true, retry: true, filter:"acceptOnlyPublicCity/isPublicFilter"})
	// db.collection({
	// 	name: 'citiescollection',
	// 	schema: schema,
	// 	migrationStrategies: {
	// 	  // 1 means, this transforms data from version 0 to version 1
	// 	  1: function(oldDoc){
	// 		oldDoc.time = new Date(oldDoc.time).getTime(); // string to unix
	// 		return oldDoc;
	// 	  }
	// 	}
	//   });
    
	return db.citiescollection;
}

export const login = (username) => async(dispatch)=>{
	//dispatch({type:"RESET_USER_ERROR_WARNING"});
	axios.get(syncURL+username+'/').then(
		(res)=>{
			if	(res.data.db_name){
				console.log("user exist")
				dispatch({type:"SELECT_USER", payload: username})
			}else if (res.data.error){
				console.log("user not exist")
				dispatch({type: "USER_NOT_EXIST"})
			}else{
				console.dir(res)
				dispatch({type:"OTHER_ERROR"})
			}
		}
	)
}

export const loadCities= () => async (dispatch, getState)=>{
	const citiescollection = await citiesCollection(getState().selectedUser);
	citiescollection.find().$.subscribe( cities => {
		if	(!cities){
			return;
		}

		cities.forEach(city => {
			console.log(city.toJson());
		});
		
		dispatch(initialiseCity(cities));
   });
}

export const loadCityForSelectedUser = () => async (dispatch, getState) => {
	if(getState().selectedUser) {
		const citiescollection = await citiesCollection();
	  let cities = await citiescollection.find().exec();
	  cities = cities.get("cities");
		dispatch(initialiseCity(cities));
	}
}

//This function below is not quite ready yet, update should be used instead of insert
export const updateCityToUser = () => async (dispatch, getState) =>{
    const dummyCities =
        {
			_id: "singapore,sg",
			cityName: "Singapore",
			isPublic: true
        }
	
	let citiescollection = await citiesCollection(getState().selectedUser);
	// await citiescollection.upsert(dummyCities)
	//The reassignment below calls sync, reassignment does not change anything
    citiescollection = await citiesCollection(getState().selectedUser);
	dispatch(addCity(dummyCities));
}

export const addUser = (username) => async(dispatch, getState) => {
    // let usercollection = await userCollection();

    // await usercollection.upsert({
	// 	_id: 'Sharon',
	// 	cities: [
	// 		{
	// 			cityName: "Singapore",
	// 			cityRef: "singapore,sg"
	// 		},
	// 		{
	// 			cityName: "Kuala Lumpur",
	// 			cityRef: "kuala lumpur,my"
	// 		},
	// 		{
	// 			cityName: "Soest",
	// 			cityRef: "Soest,de"
	// 		}
	// 	]
	// })
	
	const db = await RxDB.create({
		name: username,           // <- name
		adapter: 'idb',          // <- storage-adapter
		ignoreDuplicate: true
	});

	const citiesCollection = await db.collection({
		name: 'citiescollection',
		schema: schema
	})
	const remoteDB = syncURL+username+'/';
	citiesCollection.sync(remoteDB, {filter: 'acceptOnlyPublicCity/isPublicFilter', query_params: "isPublic" , live: true, retry: true});
	dispatch({
		type: "NONE",
		payload: "NULL"
	});
}