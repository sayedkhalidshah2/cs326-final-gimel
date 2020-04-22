/* eslint-disable no-mixed-spaces-and-tabs */
let express = require("express")

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db) {
    	this.theDatabase = db
    	// from https://enable-cors.org/server_expressjs.html
    	this.router.use((request, response, next) => {
	    response.header("Content-Type","application/json")
	    response.header("Access-Control-Allow-Origin", "*")
	    response.header("Access-Control-Allow-Headers", "*")
	    next()
    	})
    	// Serve static pages from a particular path.
    	this.server.use("/", express.static("./html"))

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
    	this.router.post("/menu/:rest", this.addResturaunt.bind(this))
    	this.router.get("/menus/:rest", this.getResturauntItems.bind(this))
    	this.router.delete("/menus/:rest",this.deleteResturaunt.bind(this))
    	this.router.get("/menu/:rest/:item",this.getItem.bind(this))
    	this.router.post("/menu/:rest/:item",this.addItem.bind(this))
    	this.router.delete("/menus/:rest/:item",this.deleteItem.bind(this))


    	// this.router.get("/users/:userId/update", [this.errorHandler.bind(this), this.updateHandler.bind(this) ])
    	// this.router.get("/users/:userId/delete", [this.errorHandler.bind(this), this.deleteHandler.bind(this) ])
	
    	//// HANDLE ERRORS WITH A WILDCARD (*)
    	// this.router.get("/*", this.errorHandler.bind(this))

    	// Start up the counter endpoint at '/'.
    	this.server.use("/", this.router)
    }
	
    //Funciton to add a restaurant to the collection of restaurants in the DB
    //Parameters: JSON object with attribute(s): {name,dscr}
    //Returns: JSON object with attribute(s): {name,dscr}
    private async addResturaunt(request, response) : Promise<void> {
    	console.log("adding resturaunt")
    	let name = request.params.rest
    	let obj = await this.theDatabase.create(name, request.body.dscr)
    	response.write(JSON.stringify(obj))
    	response.end()
    }
	
    //Adds an item to a restaurant in the DB 
    //Parameters: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
    private async addItem(request, response) : Promise<void> {
    	let rest = request.params.rest
    	let item = request.params.item

    	console.log("adding Item")
    	let obj = await this.theDatabase.addItem(rest, item, request.body.dscr, request.body.cost, request.body.dscr )
    	response.write(JSON.stringify(obj))
    	response.end()
    }

    //Gets the list of restaurants from the DB 
    //Parameters: None
    //Returns: JSON object with attribute(s): {menus: [List of restuaurants]}
    private async getResturants(request,response):  Promise<void> {
    	let rest = await this.theDatabase.getResturaunts()
    	let result = {
    		"menus": rest
    	}
    	response.write(JSON.stringify(result))
    	response.end()
    }

    //Gets them menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant
    //Returns: JSON object with attribute(s): {items : [List of menu objects]}
    //EX: 
    public async getResturauntItems(request, response) : Promise<void> {
    	let rest = request.params.rest
    	let objs = this.theDatabase.getResturauntItems(rest)
    	response.write(JSON.stringify(objs))
    	response.end()
    }

    //Gets an item from a  menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant 
    //item: the name of the item
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //EX: 
    public async getItem(request,response) : Promise<void> {
    	let rest = request.params.rest
    	let item = request.params.item
    	let obj = await this.theDatabase.get(rest, item)
    	//Break apart the object returned by the DB:
    	response.write(JSON.stringify(obj))
    	response.end()
    }

    //Deletes an item from a  menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant, 
    //item: the name of the item
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //EX: 
    private async deleteItem(request,response) : Promise<void> {
    	let rest = request.params.rest
    	let name = request.params.name
    	let obj = await this.theDatabase.getItem(rest,name)
    	//Break apart the object returned by the DB:
    	await this.theDatabase.deleteItem(rest,name)
    	response.write(JSON.stringify(obj))
    	response.end()

    }
	
    private async deleteResturaunt(request,response) : Promise<void> {
    	let rest = request.params.rest
    	 await this.theDatabase.get(rest)
    	//Break apart the object returned by the DB:

    	let obj = await this.theDatabase.deleteResturaunt(rest)
    	response.write(JSON.stringify(obj))
    	response.end()

    }

    public listen(port) : void  {
    	this.server.listen(port)
    }
    
}

