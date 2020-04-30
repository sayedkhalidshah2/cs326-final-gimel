/* eslint-disable no-mixed-spaces-and-tabs */
const express = require("express")

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private router = express.Router();

    constructor(db) {
    	this.theDatabase = db
    	// from https://enable-cors.org/server_expressjs.html
    	this.router.use((request, response, next) => {
	    response.header("Content-Type","application/json")
	    response.header("Access-Control-Allow-Origin", "*")
    	response.header("Access-Control-Allow-Headers", "*")
    	response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	    next()
    	})
    	// Serve static pages from a particular path.
    	this.server.use("/", express.static("./client"))
    	this.server.use(express.json())
    	this.server.use(express.urlencoded({ extended: false }))

    	this.server.use((req, res, next) => {
    		res.header("Access-Control-Allow-Origin", "*")
    		res.header(
    			"Access-Control-Allow-Headers",
    			"Origin, X-Requested-With, Content-Type, Accept"
    		)
    		next()
    	})
		
    	//// HANDLE CREATE, READ, UPDATE, AND DELETE OPERATIONS
    	this.router.get("/menus", this.getResturants.bind(this))
    	this.router.post("/menus", this.addResturaunt.bind(this))
    	this.router.get("/menus/:rest", this.getResturauntItems.bind(this))
    	this.router.delete("/menus/:rest",this.deleteResturaunt.bind(this))
    	this.router.get("/menus/:rest/:item",[this.errorHandler.bind(this),this.getItem.bind(this)])
    	this.router.post("/menus/:rest",this.addItem.bind(this))
    	this.router.delete("/menus/:rest/:item",this.deleteItem.bind(this))

    	this.router.post("/login",this.login.bind(this))

    	// this.router.get("/users/:userId/update", [this.errorHandler.bind(this), this.updateHandler.bind(this) ])
    	// this.router.get("/users/:userId/delete", [this.errorHandler.bind(this), this.deleteHandler.bind(this) ])
	
    	//// HANDLE ERRORS WITH A WILDCARD (*)
    	// this.router.get("/*", this.errorHandler.bind(this))

    	// Start up the counter endpoint at '/'.
    	this.server.use("/", this.router)
    }
<<<<<<< HEAD
    private async errorHandler(request, response, next): Promise<void> {
    	const value: boolean = await this.theDatabase.isFound(request.params["item"]+"-"+request.body.name)
=======
    private async errorHandler(request, response, next) : Promise<void> {
    	let value : boolean = await this.theDatabase.isFound(request.params["item"]+"-"+request.body.name)
>>>>>>> 335da6e... attempting to generate pages dynamicaly
    	//	console.log("result from database.isFound: " + JSON.stringify(value));
    	if (!value) {
    		response.write(JSON.stringify({"result" : "error"}))
    		response.end()
    	} else {
    		next()
    	}
    }
    //Funciton to add a restaurant to the collection of restaurants in the DB
    //Parameters: JSON object with attribute(s): {name,dscr}
    //Returns: JSON object with attribute(s): {name,dscr}
    private async addResturaunt(request, response): Promise<void> {
    	console.log("adding resturaunt")
<<<<<<< HEAD
    	const obj = await this.theDatabase.addResturaunt(request.body.name, request.body.dscr)
=======
    	let obj = await this.theDatabase.addResturaunt(request.body.name, request.body.dscr)
>>>>>>> 335da6e... attempting to generate pages dynamicaly
    	response.status(201).send(JSON.stringify(obj))
    	response.end()

    }
	
    //Adds an item to a restaurant in the DB 
    //Parameters: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
<<<<<<< HEAD
    private async addItem(request, response): Promise<void> {
    	console.log("adding Item")
    	console.log(request.params.rest)
    	console.log( request.body.name)
    	const obj = await this.theDatabase.addItem(request.params.rest, request.body.name, request.body.cost, request.body.descr, request.body.type )
=======
    private async addItem(request, response) : Promise<void> {
    	console.log("adding Item")
    	console.log(request.params.rest)
    	console.log( request.body.name)
    	let obj = await this.theDatabase.addItem(request.params.rest, request.body.name, request.body.cost, request.body.descr, request.body.type )
>>>>>>> 335da6e... attempting to generate pages dynamicaly
		
    	if(obj === -1){
    		response.status(404).send("Resturaunt " + request.params.rest + " not found.")
    	}
    	response.status(201).send(JSON.stringify(obj))
    	response.end()

    }

    //Gets the list of restaurants from the DB 
    //Parameters: None
    //Returns: JSON object with attribute(s): {menus: [List of restuaurants]}
    private async getResturants(request, response):  Promise<void> {
<<<<<<< HEAD
    	const rest = await this.theDatabase.getResturaunts()
=======
    	let rest = await this.theDatabase.getResturaunts()
>>>>>>> 335da6e... attempting to generate pages dynamicaly
    	response.status(201).send(JSON.stringify(rest))
    	response.end()
    }

    //Gets them menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant
    //Returns: JSON object with attribute(s): {items : [List of menu objects]}
    //EX: 
<<<<<<< HEAD
    public async getResturauntItems(request, response): Promise<void> {
    	const rest = request.params.rest
    	const obj = await this.theDatabase.getResturauntItems(rest)
=======
    public async getResturauntItems(request, response) : Promise<void> {
    	let rest = request.params.rest
    	let obj = await this.theDatabase.getResturauntItems(rest)
>>>>>>> 335da6e... attempting to generate pages dynamicaly
    	response.status(201).send(JSON.stringify(obj))
    	response.end()
    }

    //Gets an item from a  menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant 
    //item: the name of the item
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //EX: 
<<<<<<< HEAD
    public async getItem(request,response): Promise<void> {
    	const rest = request.params.rest
    	const item = request.params.item
    	console.log(rest)
    	console.log(item)
    	const obj = await this.theDatabase.getItem(rest, item)
=======
    public async getItem(request,response) : Promise<void> {
    	let rest = request.params.rest
    	let item = request.params.item
    	console.log(rest)
    	console.log(item)
    	let obj = await this.theDatabase.getItem(rest, item)
>>>>>>> 335da6e... attempting to generate pages dynamicaly
    	//Break apart the object returned by the DB:
    	response.status(201).send(JSON.stringify(obj))
    	response.end()

    }

    //Deletes an item from a  menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant, 
    //item: the name of the item
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //EX: 
<<<<<<< HEAD
    public async deleteItem(request,response): Promise<void> {
    	const rest = request.params.rest
    	const name = request.params.item
    	console.log("Deleting: "+rest+" "+name)
    	// let obj = await this.theDatabase.getItem(rest,name)
    	//Break apart the object returned by the DB:
    	const obj = await this.theDatabase.deleteItem(rest,name)
=======
    public async deleteItem(request,response) : Promise<void> {
    	let rest = request.params.rest
    	let name = request.params.item
    	console.log("Deleting: "+rest+" "+name)
    	// let obj = await this.theDatabase.getItem(rest,name)
    	//Break apart the object returned by the DB:
    	let obj = await this.theDatabase.deleteItem(rest,name)
>>>>>>> 335da6e... attempting to generate pages dynamicaly
    	response.status(201).send(JSON.stringify(obj))
    	response.end()


    }
	
    private async deleteResturaunt(request,response): Promise<void> {
    	const rest = request.params.rest
    	//  await this.theDatabase.get(rest)
    	//Break apart the object returned by the DB:
<<<<<<< HEAD
    	const obj = await this.theDatabase.deleteResturaunt(rest)
    	response.status(201).send(JSON.stringify(obj))
    	response.end()
    }
	
    private async login(request,response): Promise<void> {
    	console.log("login")
    	const rest = request.body.code
    	//  await this.theDatabase.get(rest)
    	//Break apart the object returned by the DB:
    	const obj = await this.theDatabase.login(rest)
    	if(!obj){
    		response.sendStatus(404)
    	}
    	else{
    		response.status(200).send(obj.rest)
    	}
    	response.end()
=======

    	let obj = await this.theDatabase.deleteResturaunt(rest)
    	response.status(201).send(JSON.stringify(obj))
    	response.end()


>>>>>>> 335da6e... attempting to generate pages dynamicaly
    }

    public listen(port): void  {
    	this.server.listen(port)
    }
    
}

