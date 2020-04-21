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
    private async addRestHandler(request, response) : Promise<void> {
    	console.log("adding resturaunt")
		await this.theDatabase.create(request.body)
		response.write(JSON.stringify(request.body))
    	response.end()
	}
	
	private async addItemHandler(request, response) : Promise<void> {
    	console.log("adding Item")
		await this.theDatabase.put(request.body)
		response.write(JSON.stringify(request.body))
    	response.end()
	}

	private async getRestHandler(request,response):  Promise<void> {
		let rest = await this.theDatabase.getCollectionNames();
		let result = {
			'menus': rest
		}
		response.write(JSON.stringify(result));
		response.end()
	}

	public async getrestMenuHandler(request, response) : Promise<void> {
		let coll = request.params.rest
		let objs = await this.theDatabase.collection(coll).find()
		let result = {
			'items':objs
		}
		response.write(JSON.stringify(result))
		response.end()
	}

	public async getrestMenuItemHandler(request,response) : Promise<void> {
		let restaurant = request.params.rest;
		let item = request.params.item;
		let obj = await this.theDatabase.collection(restaurant).find(item)
		//Break apart the object returned by the DB:
	}

	private async deleteRestItemHandler(request,response) : Promise<void> {
		let rest = request.params.rest;
		let name = request.params.name
		let item = await this.theDatabase.collection(rest).find(name);
		//Break apart the object returned by the DB:


		await this.theDatabase.collection(rest).del(name);

	}

    public listen(port) : void  {
    	this.server.listen(port)
    }

    public async errorCounter(name: string, response) : Promise<void> {
    	response.write(JSON.stringify({"result": "error"}))
    	response.end()
    }

    
}

