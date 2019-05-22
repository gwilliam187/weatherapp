import * as RxDB from 'rxdb';
import NodeCouchDb from 'node-couchdb'

import { initialiseCity } from './cityActions';
import { initialiseTree } from "./treeAction";
import { citySchema, treeSchema } from '../Schema';
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
		toast(`Replicated document "${ docData._id}"`);
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

	return db;
}

export const setDB = (db)=> async(dispatch,getState)=>{
	dispatch({type: 'INITIALISE_RXDB', payload: db})
}

export const citiesCollection = (db)=>{
	console.log('citiesCollection');
    
	return db.citiescollection;
}

export const treeCollection = (db)=>{
	return db.treecollection;
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
// }n

export const login = (username) => async(dispatch)=>{
	const couch = new NodeCouchDb({
		host: 'sgu.pdm-commsult.intranet',
		protocol: 'http',
		port: 5984,
		auth:{
			user: 'admin',
			pass: 'password'
		}
	})

	const couchDbs = await couch.listDatabases()
	if (!couchDbs.includes(username)) {
		couch.createDatabase(username).then(() => {
			const ddoc = {
				"_id": "_design/viewAll",
				"views": {
					"viewAll-index": {
						"map": "function (doc) {\n  emit(doc._id, {'_id': doc._id, '_rev': doc._rev, 'cityName': doc.cityName, 'isPublic': doc.isPublic, 'fromBackend': doc.fromBackend});\n}"
					}
				},
				"language": "javascript",
				"fromBackend": false
			};
		couch.insert(username, ddoc).then(({ data, headers, status }) => {
			dispatch({type:"SELECT_USER", payload: username})
		})
	}, err =>{
			console.log(err)
			dispatch({type: 'OTHER_ERROR'})
		})
	}else{
		dispatch({type:"SELECT_USER", payload: username})
	}
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