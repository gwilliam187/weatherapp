import * as RxDB from 'rxdb';

import { initialiseCity } from './cityActions';
import { initialiseTree } from "./treeAction";
import { citySchema, treeSchema } from '../Schema';
import axios from 'axios';
import { toast } from 'react-toastify';

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const ipAddress = 'sgu.pdm-commsult.intranet:5984';

// const putURL = `http://admin:password@${ ipAddress }/`;
const syncURL = `http://${ ipAddress }/`

export const createDB = async(dbName)=> {
	const db = await RxDB.create({
		name: dbName,
		adapter: 'idb',
		password: 'password',
		ignoreDuplicate: true
	});
	// toast.update(toastId, { render: "RxDB created", type: toast.TYPE.SUCCESS, autoClose: 3000 });

	db.waitForLeadership().then(() => {
		document.title = '♛ ' + document.title;
	});

	const citiesCollection = await db.collection({
		name: 'citiescollection',
		schema: citySchema
	})

	const replicationState = citiesCollection.sync({
		remote: syncURL+dbName+'/',
		waitForLeadership: true,
		direction:{
			pull: true,
			push: true
		},
		options:{
			live:true,
			retry: true,
			conflicts: true
		},
		//query: citiesCollection.find().where('isPublic').eq(true)
	});

	replicationState.change$.subscribe(changeEvent => {
		if(changeEvent.direction === 'push') {
			toast.success(`Pushed changes`);
		} else if(changeEvent.direction === 'pull') {
			toast.success(`Pulled changes`);
		}
		console.log('replicationState change subscriber');
		console.log(changeEvent);
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

	return db;
}

export const setDB = (db)=> async(dispatch,getState)=>{
	dispatch({type: 'INITIALISE_RXDB', payload: db})
}

export const citiesCollection =async(db)=>{
	console.log('citiesCollection');

	console.log(db)
	


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

// export const treeCollection = async()=>{
// 	const dbName = "trees"
//
// 	const db = await createDB(dbName);
//
// 	const treeCollection = await db.collection({
// 		name: 'treecollection',
// 		schema: treeSchema
// 	})
//
// 	const replicationState = treeCollection.sync({
// 		remote: syncURL+dbName+'/',
// 		waitForLeadership: true,
// 		direction:{
// 			pull: true,
// 			push: true
// 		},
// 		options:{
// 			live:true,
// 			retry: true,
// 			conflicts: true
// 		}
// 		//query: treeCollection.find().where('isPublic').eq(true)
// 	});
//
//
// 	replicationState.docs$.subscribe(docData => {
// 		toast(`Replicated document "${ docData._id }"`);
// 		console.dir(docData);
// 	});
// 	replicationState.denied$.subscribe(docData => {
// 		toast(`Denied document "${ docData._id }"`);
// 		console.dir(docData);
// 	});
// 	replicationState.error$.subscribe(error => {
// 		toast(`Error: ${ error }`);
// 		console.dir(error)
// 	});
//
// 	//citiesCollection.sync(dbName, syncURL+dbName+'/', {live: true, retry: true, filter:"acceptOnlyPublicCity/isPublicFilter"})
// 	// db.collection({
// 	// 	name: 'citiescollection',
// 	// 	schema: schema,
// 	// 	migrationStrategies: {
// 	// 	  // 1 means, this transforms data from version 0 to version 1
// 	// 	  1: function(oldDoc){
// 	// 		oldDoc.time = new Date(oldDoc.time).getTime(); // string to unix
// 	// 		return oldDoc;
// 	// 	  }
// 	// 	}
// 	//   });
//
// 	return db.treecollection;
// }

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

export const loadCities= (db) => async (dispatch, getState)=>{
	console.log('loadCities');
	const citiescollection = await citiesCollection(db);

	citiescollection.update$.subscribe(changeEvent => {
		toast(`Updated ${ changeEvent.data.doc }`)
	});

	citiescollection.find().$.subscribe( cities => {
		if(!cities) return

		console.log('Cities Collection');
		console.log(cities.map(city => city.toJSON()))

		dispatch(initialiseCity(cities))
  });
}
//
export const loadTrees = ()=>async (dispatch, getState)=>{}
// 	const treescollection = await treeCollection(getState().selectedUser);
// 	treescollection.find().$.subscribe(trees=>{
// 		if (!trees) {
// 			return
// 		}else{
// 			// console.log(trees)
// 			dispatch(initialiseTree(trees))
// 		}
// 	})
// }

export const toggleCityIsPublic = (city) => async(dispatch, getState)=>{
	let citiescollection = await citiesCollection(getState().rxdb);
	citiescollection.findOne().where("_id").eq(city._id).exec().then( async(doc)=>{
		console.log(doc.toJSON())
		if	(!city.isPublic){
			await doc.update({
				$set: {
					isPublic : !city.isPublic,
					fromBackend: false
				}
			})
			// toast(`Updated city "${ city.cityName }" to Public`);
		}else{
			await doc.remove();
			await citiescollection.insert({
				_id: city._id,
				cityName : city.cityName,
				isPublic: !city.isPublic,
				fromBackend: false
			});
		}
	})
	citiescollection = await citiesCollection(getState().rxdb);
	// toast(`Updated city "${ city.cityName }" to Private`);
	let cities = await citiescollection.find().exec();
	dispatch(initialiseCity(cities));
}

export const updateCityName = (city) => async(dispatch, getState) => {
	let citiescollection = await citiesCollection(getState().rxdb);
	citiescollection.findOne().where("_id").eq(city._id).exec().then(async doc => {
		console.log(doc.toJSON())
		await doc.update({
			$set: {
				cityName : city.newName,
				fromBackend: false
			}
		})
		// toast(`Updated city "${ city.cityName }" to "${ city.newName }"`);
	})
	citiescollection = await citiesCollection(getState().rxdb);
	let cities = await citiescollection.find().exec();
	dispatch(initialiseCity(cities));

}

export const loadCityForSelectedUser = () => async (dispatch, getState) => {
	if(getState().rxdb) {
		const citiescollection = await citiesCollection(getState().rxdb);
		let cities = await citiescollection.find().exec();
		dispatch(initialiseCity(cities));
	}
}

export const addCityDocument = (cityObj) => async (dispatch, getState)=>{
	let citiescollection = await citiesCollection(getState().rxdb);
	
	if	(cityObj._id && cityObj.cityName){
		const doc = await citiescollection.upsert(cityObj);
		toast(`Added city "${ doc.cityName }"`);
		// toast(`Added city "${ cityObj.cityName }"`);
	}
}

export const removeCityDocument = (cityObj) => async(dispatch, getState)=>{
	if	(cityObj._id && cityObj.cityName){
		let citiescollection = await citiesCollection(getState().rxdb);
		citiescollection.findOne().where("_id").eq(cityObj._id).exec().then( async(doc)=>{
			await doc.remove();
			toast(`Removed city "${ doc.cityName }"`);
		})
		if	(cityObj.isPublic)
			citiescollection = await citiesCollection(getState().rxdb);
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