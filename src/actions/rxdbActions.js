import * as RxDB from 'rxdb';
import NodeCouchDb from 'node-couchdb'

import store from '../store';
import { initialiseCity } from './cityActions';
import { getCitiesRequest, getCitiesSuccess, getCitiesFailure } from './citiesFetcherActions';
import { citiesStartSync, citiesStopSync } from './citiesSyncActions';
import { initialiseTree } from "./treeAction";
import { citySchema, treeSchema } from '../Schema';
import { toast } from 'react-toastify';


RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const ipAddress = 'sgu.pdm-commsult.intranet:5984';

const syncURL = `http://admin:password@${ ipAddress }/`;
// const syncURL = `http://${ ipAddress }/`

export const createDB = async(dbName, region)=> {
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
		remote: syncURL+'cities/',
		waitForLeadership: true,
		direction:{
			pull: true,
			push: true
		},
		options:{
			live:true,
			retry: true,
			conflicts: true,
			filter: 'region/by_region',
			query_params: { "region": region }
		}
	});

	// USE THE CODE BELOW WHEN NEW SCHEMA IS INTRODUCED AND MIGRATION ERROR APPEARS
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

	// replicationState.change$.subscribe(changeEvent => {
	// 	if(changeEvent.direction === 'push') {
	// 		toast.success(`Pushed changes`);
	// 	} else if(changeEvent.direction === 'pull') {
	// 		toast.success(`Pulled changes`);
	// 	}
	// });

	// replicationState.docs$.subscribe(docData => {
	// 	toast(`Replicated document "${ docData._id}"`);
	// 	console.dir(docData);
	// });
	// replicationState.alive$.subscribe(alive => {
	// 	toast('Alive: ' + alive);
	// 	console.log(alive);
	// })
	replicationState.active$.subscribe(active => {
		if(active) {
			store.dispatch(citiesStartSync());
		} else {
			store.dispatch(citiesStopSync());
		}
	})
	replicationState.denied$.subscribe(docData => {
		toast(`Denied document "${ docData._id }"`);
		console.dir(docData);
	});
	replicationState.error$.subscribe(error => {
		toast(`Error: ${ error }`);
		console.dir(error)
	});

	const treeCollection = await db.collection({
		name: 'treecollection',
		schema: treeSchema
	})

	const replicationSt = treeCollection.sync({
		remote: syncURL+'/trees',
		waitForLeadership: true,
		direction:{
			pull: true,
			push: true
		},
		options:{
			live:true,
			retry: true,
			conflicts: true
		}
		//query: treeCollection.find().where('isPublic').eq(true)
	});

	replicationSt.docs$.subscribe(docData => {
		toast(`Replicated document "${ docData._id }"`);
		console.dir(docData);
	});
	replicationSt.denied$.subscribe(docData => {
		toast(`Denied document "${ docData._id }"`);
		console.dir(docData);
	});
	replicationSt.error$.subscribe(error => {
		toast(`Error: ${ error }`);
		console.dir(error)
	});

	console.log(db)
	return db;
}

export const setDB = (db)=> async(dispatch,getState)=>{
	dispatch({type: 'INITIALISE_RXDB', payload: db})
}

export const citiesCollection = (db)=>{
	return db.citiescollection;
}

export const treeCollection = (db)=>{
	return db.treecollection;
}

export const login = (username) => async(dispatch, getState)=>{
	const couch = new NodeCouchDb({
		host: 'sgu.pdm-commsult.intranet',
		protocol: 'http',
		port: 5984,
		auth:{
			user: 'admin',
			pass: 'password'
		}
	})
}

export const loadCities= (db) => async (dispatch, getState)=>{
	dispatch(getCitiesRequest());

	const citiescollection = await citiesCollection(db);

	// citiescollection.update$.subscribe(changeEvent => {
	// 	toast(`Updated ${ changeEvent.data.doc }`)
	// });

	citiescollection.$.subscribe(chg => {
		toast(chg.data.op + ' on ' + chg.data.doc)
	})

	citiescollection.find().$.subscribe( cities => {
		if(!cities) return

		console.log('Cities Collection');
		console.log(cities.map(city => city.toJSON()));

		dispatch(initialiseCity(cities));
		dispatch(getCitiesSuccess());
  });
}
//
export const loadTrees = (db)=>async (dispatch, getState)=>{
	const treescollection = await treeCollection(db);
	treescollection.find().$.subscribe(trees=>{
		if (!trees) {
			return
		}else{
			// console.log(trees)
			dispatch(initialiseTree(trees))
		}
	})
}

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
		// console.log(doc.toJSON())
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

export const destroyDB = (dbName)=>{
	return new Promise(async resolve=>{
		const db = await RxDB.create({
			name: dbName,
			adapter: 'idb',
			password: 'password',
			ignoreDuplicate: true
		});

		await db.remove()
		resolve(true)
	})
}
