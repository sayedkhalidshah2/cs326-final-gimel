/* eslint-disable no-mixed-spaces-and-tabs */
var pass = ""
if (!process.env.MONGO_KEY) {
	pass = require("./secrets.json").MONGO_KEY
}
export class Database {
		
	private MongoClient = require("mongodb").MongoClient;

	private uri = process.env.MONGO_KEY || pass
    private client;
    private collectionName : string;
    private dbName : string = "BergerCluster";

    constructor() {
    	this.client = new this.MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true,		}, );
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
	
    public async addResturaunt(name: string, descr: string) : Promise<void> {		
    	let db = this.client.db(this.dbName)
    	let collection = db.collection("Resturaunts")
    	let result = await collection.updateOne( {"name": name}, {$set: {"descr": descr}}, { "upsert" : true } )
    	console.log("result = " + result)
    	return result
    }

	
    public async addItem(rest: string, item:string, cost:number, descr: string, type:string) : Promise<any> {
    	let db = this.client.db(this.dbName)
    	let collectionR = db.collection("Resturaunts")
    	let resultR = await collectionR.findOne( {"name": rest} )		
    	// if(resultR === null){
    	// 	return -1
    	// }
    	let collection = db.collection(rest)
    	console.log("putting " + item)
    	let result = await collection.updateOne( {"name": item}, 
    		{$set: {"descr": descr, "cost": cost, "type": type}}, 
    		{ "upsert" : true } )
    	console.log("result = " + result)
    	return result
    }
	
    public async getItem(rest: string, item:string) : Promise<void> {
    	let db = this.client.db(this.dbName)
    	let collection = db.collection(rest)
    	console.log("getting " + item)
    	let result = await collection.findOne( {"name": item})
    	console.log("result = " + JSON.stringify(result))
    	return result
    }
	
		
    public async deleteItem(rest: string, item:string) : Promise<void> {
    	let db = this.client.db(this.dbName)
    	let collection = db.collection(rest)
    	console.log("deleting " + item)
    	let result = await collection.deleteOne( {"name": item})
    	console.log("result = " + result)
    	return result
    }
	
    public async getResturaunts() : Promise<string> {
    	let db = this.client.db(this.dbName)
    	let collection = db.collection("Resturaunts")
    	console.log("getting resturaunts")
    	let result = await collection.find().toArray()
    	console.log("result = " + JSON.stringify(result))
    	return result
    }
	
    public async deleteResturaunt(rest: string) : Promise<string> {
    	let db = this.client.db(this.dbName)
    	let collection = db.collection(rest)
    	let result
    	console.log("deleting "+ rest)
    	try {result = await collection.drop()}
    	catch(e) { console.log(e)   }
    	console.log("result = " + result)

    	let collection2 = db.collection("Resturaunts")
    	let result2 = await collection2.deleteOne( {"name": rest})
    	console.log("result2 = " + result2)

    	return result2
    }
	
    public async getResturauntItems(rest :string) : Promise<string> {
    	let db = this.client.db(this.dbName)
    	let collection = db.collection(rest)
    	console.log("getting "+ rest)
    	let result = await collection.find().toArray()
    	console.log("result = " + JSON.stringify(result))
    	return result 
    }

    // public async isFound(rest: string,name:string) : Promise<boolean>  {
    // 	console.log("isFound: rest = " + rest)
    // 	let v = await this.get(rest,name)
    // 	console.log("is found result = " + v)
    // 	if (v === null) {
    //     	return false
    // 	} else {
    //     	return true
    // 	}
    // }
    public async isFound(rest: string) : Promise<boolean>  {
    	console.log("isFound: key = " + rest)
    	let v = await this.getResturauntItems(rest)
    	console.log("is found result = " + v)
    	if (v === null) {
    		return false
    	} else {
    		return true
    	}
    }
}
