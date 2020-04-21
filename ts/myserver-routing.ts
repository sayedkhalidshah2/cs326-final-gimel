/* eslint-disable no-mixed-spaces-and-tabs */
let http = require("http")
let url = require("url")
let express = require("express")

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8081;
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
		this.router.post('/create', this.addRestHandler.bind(this));
		this.router.post('/menu',this.addItemHandler.bind(this));
		this.router.get('/menu', this.getRestHandler.bind(this));
		this.router.get('/menus/:rest', this.getrestMenuHandler.bind(this));
		this.router.get('/menu/:rest/:item',this.getrestMenuItemHandler.bind(this));
		this.router.delete('/menu',this.deleteRestItemHandler.bind(this));

    	// this.router.get("/users/:userId/update", [this.errorHandler.bind(this), this.updateHandler.bind(this) ])
    	// this.router.get("/users/:userId/delete", [this.errorHandler.bind(this), this.deleteHandler.bind(this) ])
	
    	//// HANDLE ERRORS WITH A WILDCARD (*)
    	// this.router.get("/*", this.errorHandler.bind(this))

    	// Start up the counter endpoint at '/'.
    	this.server.use("/", this.router)
    }

    private async errorHandler(request, response, next) : Promise<void> {
    	let value : boolean = await this.theDatabase.isFound(request.params["userId"]+"-"+request.query.name)
    	if (!value) {
			response.write(JSON.stringify({"result" : "error"}))
			response.end()
    	} else {
	    	
		}
	}
	
	//Funciton to add a restaurant to the collection of restaurants in the DB
	//Parameters: JSON object with attribute(s): {name,dscr}
	//Returns: JSON object with attribute(s): {name,dscr}
    private async addRestHandler(request, response) : Promise<void> {
    	console.log("adding resturaunt")
		await this.theDatabase.create(request.body)
		response.write(JSON.stringify(request.body))
    	response.end()
	}
	
	//Adds an item to a restaurant in the DB 
	//Parameters: JSON object with attribute(s): {name,cost,dscr,rest,type}
	//Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
	private async addItemHandler(request, response) : Promise<void> {
    	console.log("adding Item")
		await this.theDatabase.put(request.body)
		response.write(JSON.stringify(request.body))
    	response.end()
	}

	//Gets the list of restaurants from the DB 
	//Parameters: None
	//Returns: JSON object with attribute(s): {menus: [List of restuaurants]}
	private async getRestHandler(request,response):  Promise<void> {
		let rest = await this.theDatabase.getRest();
		let result = {
			'menus': rest
		}
		response.write(JSON.stringify(result));
		response.end()
	}

	//Gets them menu of a restaurant in the DB 
	//Parameters: 
		//rest: the name of the restaurant
	//Returns: JSON object with attribute(s): {items : [List of menu objects]}
	//EX: 
	public async getrestMenuHandler(request, response) : Promise<void> {
		let coll = request.params.rest
		let objs = this.theDatabase.getRestMenu(coll)
		let result = {
			'items':objs
		}
		response.write(JSON.stringify(result))
		response.end()
	}

	//Gets an item from a  menu of a restaurant in the DB 
	//Parameters: 
		//rest: the name of the restaurant 
		//item: the name of the item
	//Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
	//EX: 
	public async getrestMenuItemHandler(request,response) : Promise<void> {
		let restaurant = request.params.rest;
		let item = request.params.item;
		let obj = await this.theDatabase.get(restaurant,item)
		//Break apart the object returned by the DB:
	}

	//Deletes an item from a  menu of a restaurant in the DB 
	//Parameters: 
		//rest: the name of the restaurant, 
		//item: the name of the item
	//Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
	//EX: 
	private async deleteRestItemHandler(request,response) : Promise<void> {
		let rest = request.params.rest;
		let name = request.params.name
		let obj = await this.theDatabase.get(rest,name)
		//Break apart the object returned by the DB:


		await this.theDatabase.del(rest,name);

	}

    public listen(port) : void  {
    	this.server.listen(port)
    }

    public async errorCounter(name: string, response) : Promise<void> {
    	response.write(JSON.stringify({"result": "error"}))
    	response.end()
    }

    
}

