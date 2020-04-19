let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db) {
	this.theDatabase = db;
	// from https://enable-cors.org/server_expressjs.html
	this.router.use((request, response, next) => {
	    response.header('Content-Type','application/json');
	    response.header('Access-Control-Allow-Origin', '*');
	    response.header('Access-Control-Allow-Headers', '*');
	    next();
	});
	// Serve static pages from a particular path.
	this.server.use('/', express.static('./html'));

	this.server.use(express.json());
	this.server.use(express.urlencoded({ extended: false }));

	this.server.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
		next();
	});
	//// YOUR CODE GOES HERE
	//// HANDLE CREATE, READ, UPDATE, AND DELETE OPERATIONS
	this.router.get('/users/:userId/create', this.createHandler.bind(this));
	this.router.get('/users/:userId/read', [this.errorHandler.bind(this), this.readHandler.bind(this) ]);
	this.router.get('/users/:userId/update', [this.errorHandler.bind(this), this.updateHandler.bind(this) ]);
	this.router.get('/users/:userId/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this) ]);
	
	//// HANDLE ERRORS WITH A WILDCARD (*)
	this.router.get('/*', this.errorHandler.bind(this));

	// Start up the counter endpoint at '/counter'.
	this.server.use('/counter', this.router);
    }

    private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.query.name);
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
    }
    
    private async createHandler(request, response) : Promise<void> {
		console.log('create')
		await this.createCounter(request, response); //C
    }

    private async readHandler(request, response): Promise<void> {
		await this.readCounter(request.params['userId']+"-"+request.query.name, response);
		console.log('read')
    }

    private async updateHandler(request, response) : Promise<void> {
		await this.updateCounter(request.params['userId']+"-"+request.query.name, request.query.value, response);
		console.log('update')

    }

    private async deleteHandler(request, response) : Promise<void> {
		await this.deleteCounter(request.params['userId']+"-"+request.query.name, response);
		console.log('delete')

    }

    public listen(port) : void  {
	this.server.listen(port);
    }

    public async createCounter(request, response) : Promise<void> {
		const name = request.body['name'];
		const cost = request.body['cost'];
		const dscr = request.body['dscr'];
		const grup = request.body['grup'];
		const rstr = request.body['rstr'];

		console.log("Creating Menu Item With the Following Values:");
		console.log("Item Name: "+request.body['name']);
		console.log("Item Cost: "+request.body['cost']);
		console.log("Item Description: "+request.body['dscr']);
		console.log("Menu Group: "+request.body['grop']);
		console.log("Restaurant: "+request.body['rstr']);

		await this.theDatabase.put(name,cost,dscr,grup,rstr);
		response.write(JSON.stringify({
			'result' : 'created',
			'name' : name,
			'cost' : cost,
			'dscr' : dscr,
			'grup' : grup,
			'rstr' : rstr 
		}));
		response.end();
    }

    public async errorCounter(name: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

    public async readCounter(name: string, response) : Promise<void> {
	let value = await this.theDatabase.get(name);
	response.write(JSON.stringify({'result' : 'read',
				       'name' : name,
				       'value' : value }));
	response.end();
    }

	//Not Needed Because of Checking function in DB
    // public async updateCounter(name: string, value: number, response) : Promise<void> {
	// await this.theDatabase.put(name, value);
	// response.write(JSON.stringify({'result' : 'updated',
	// 			       'name' : name,
	// 			       'value' : value }));
	// response.end();
    // }
    
    public async deleteCounter(name : string, response) : Promise<void> {
	await this.theDatabase.del(name);
	response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : name }));
	response.end();
	}


// 	//Sample:
// 	var express = require("express");
// var app = express();

// // use `express.json()` and `express.urlencoded` to
// // parse incoming requests with JSON payloads
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.post("/hello", (req, res, next) => {
//   // `req.body` is a native object since `express.json()`
//   // and `express.urlencoded()` are taking care of the payload,
//   // no need for `JSON.parse()` here

//   //If the entire object is wanted back
//   const payload = {
//     ...req.body,
//   };

//   //If a singular part is wanted back
//   //const payload = req.body["<attribute>"]

//   res.status(200).json(payload);
// });

// app.listen(3000)
	
}

