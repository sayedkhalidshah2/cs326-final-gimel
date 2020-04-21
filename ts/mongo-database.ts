/* eslint-disable no-mixed-spaces-and-tabs */

import { URI } from "./secure"
export class Database {
		

    private MongoClient = require("mongodb").MongoClient;
    private uri = URI;
    private client;
    private collectionName : string;
    private dbName : string = "BergerCluster";

    constructor() {
    	this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
    	// Open up a connection to the client.
    	// Open up a connection to the client.
    	// The connection is asynchronous, but we can't call await directly
    	// in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
	
    	/* from https://anthonychu.ca/post/async-await-typescript-nodejs/

	  Async/Await and the Async IIFE

	  The await keyword can only be used inside of a function
	  marked with the async keyword. [...] One way to do this is
	  with an "async IIFE" (immediately invoked function
	  expression)...

	   (async () => {
	   // code goes here
	   })();

	*/
    	(async () => {
	    await this.client.connect().catch(err => { console.log(err) })
    	})()
	}
	
    public async create(object: any) : Promise<void> {
    	console.log(object)
		
    	let db = this.client.db(this.dbName)
    	let collection = db.collection("Resturaunts")
    	console.log("putting " + JSON.stringify(object))
    	let result = await collection.updateOne( {"name": object.name}, {$set: {"dscr": object.dscr}}, { "upsert" : true } )
    	console.log("result = " + result)
    }

    public async put(object: any) : Promise<void> {
    	let db = this.client.db(this.dbName)
    	let collection = db.collection(object.rest)
    	console.log("putting " + JSON.stringify(object))
    	let result = await collection.updateOne(object, { "upsert" : true } )
    	console.log("result = " + result)
    }

    public async get(rest: string,item:string) : Promise<string> {
    	let db = this.client.db(this.dbName) // this.level(this.dbFile);
    	let collection = db.collection(rest)
    	console.log("get: rest = " + rest)
    	let result = await collection.findOne({"name" : item })
    	console.log("get: returned " + JSON.stringify(result))
    	if (result) {
	    	return result.value
    	} else {
	    	return null
    	}
	}
	
	public async getRest() : Promise<string> {
		let db = this.client.db(this.dbName)
		let result = db.getCollectionNames()
		return result;
	}

	public async getRestMenu(key :string) : Promise<string> {
		let db = this.client.db(this.dbName) // this.level(this.dbFile);
		let collection = db.collection(key)
		let result = await collection.findOne({})
		return result 
	}
    
    public async del(rest: string,name:string) : Promise<void> {
    	let db = this.client.db(this.dbName)
    	let collection = db.collection(rest)
    	console.log("delete: rest = " + rest)
    	let result = await collection.deleteOne({"name" : name })
    	console.log("result = " + result)
    	// await this.db.del(key);
    }
    
    public async isFound(rest: string,name:string) : Promise<boolean>  {
    	console.log("isFound: rest = " + rest)
    	let v = await this.get(rest,name)
    	console.log("is found result = " + v)
    	if (v === null) {
	    	return false
    	} else {
	    	return true
    	}
    }
}
