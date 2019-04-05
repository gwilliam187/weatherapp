import * as RxDB from 'rxdb';

import { initialiseCity } from './cityActions';
import { schema } from '../Schema';
import axios from 'axios';
import { toast } from 'react-toastify';

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const ipAddress = '192.168.200.163:5984';
const syncURL = `http://${ ipAddress }/`;
// const ipAddress = '128.199.140.182:6984';
// const putURL = `http://admin:password@${ ipAddress }/`;
// const syncURL = `https://${ ipAddress }/`;



export const createDB = async(dbName)=>{
	// console.log('createdb')
	// let toastId = toast('Creating DB', { autoClose: false });
	const db = await RxDB.create({   
      name: dbName, adapter: 'idb', 
      password: 'password',
      ignoreDuplicate: true
    }
	);
	// toast.update(toastId, { render: "RxDB created", type: toast.TYPE.SUCCESS, autoClose: 3000 });

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
	const replicationState = citiesCollection.sync({
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

	replicationState.docs$.subscribe(docData => { 
		toast(`Replicated document "${ docData._id }"`);
		console.dir(docData);
	});
	replicationState.denied$.subscribe(docData => {
		toast(`Denied document "${ docData._id }"`);
		console.dir(docData);
	});
	replicationState.error$.subscribe(error => {
		toast(`Error: ${ error }`);
		console.dir(error)
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
	).catch(
		dispatch({type: "USER_NOT_EXIST"})
	)
}

export const loadCities= () => async (dispatch, getState)=>{
	const citiescollection = await citiesCollection(getState().selectedUser);
	citiescollection.find().$.subscribe( cities => {
		if	(!cities){
			return;
		}

		dispatch(initialiseCity(cities))
   });
}

export const toggleCityIsPublic = (city) => async(dispatch, getState)=>{
	let citiescollection = await citiesCollection(getState().selectedUser);
	citiescollection.findOne().where("_id").eq(city._id).exec().then( async(doc)=>{
		console.log(doc.toJSON())
		if	(!city.isPublic){
			await doc.update({
				$set: {
					isPublic : !city.isPublic
				}
			})
			toast(`Updated city "${ city.cityName }" to Public`);
		}else{
			await doc.remove();
			await citiescollection.upsert({
				_id: city._id,
				cityName : city.cityName,
				isPublic: !city.isPublic
			});
			toast(`Updated city "${ city.cityName }" to Private`);
		}
	})
	citiescollection = await citiesCollection(getState().selectedUser);
	let cities = await citiescollection.find().exec();
	dispatch(initialiseCity(cities));
}

export const loadCityForSelectedUser = () => async (dispatch, getState) => {
	if(getState().selectedUser) {
		const citiescollection = await citiesCollection();
		let cities = await citiescollection.find().exec();
		dispatch(initialiseCity(cities));
	}
}

export const addCityDocument = (cityObj) => async (dispatch, getState)=>{
	let citiescollection = await citiesCollection(getState().selectedUser);
	
	if	(cityObj._id && cityObj.cityName){
		await citiescollection.upsert(cityObj);
		toast(`Added city "${ cityObj.cityName }"`);
	}
}

export const removeCityDocument = (cityObj) => async(dispatch, getState)=>{
	if	(cityObj._id && cityObj.cityName){
		let citiescollection = await citiesCollection(getState().selectedUser);
		citiescollection.findOne().where("_id").eq(cityObj._id).exec().then( async(doc)=>{
			await doc.remove();
			toast(`Removed city "${ cityObj.cityName }"`);
		})
		if	(cityObj.isPublic)
			citiescollection = await citiesCollection(getState().selectedUser);
	}
}

//This function below is not quite ready yet, update should be used instead of insert
// export const updateCityToUser = () => async (dispatch, getState) =>{
//     const dummyCities =
//         {
// 			_id: "singapore,sg",
// 			cityName: "Singapore",
// 			isPublic: true
//         }
	
// 	let citiescollection = await citiesCollection(getState().selectedUser);
// 	// await citiescollection.upsert(dummyCities)
// 	//The reassignment below calls sync, reassignment does not change anything
//     citiescollection = await citiesCollection(getState().selectedUser);
// 	dispatch(addCity(dummyCities));
// }

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