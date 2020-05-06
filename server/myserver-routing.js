"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable no-mixed-spaces-and-tabs */
var express = require("express");
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.router = express.Router();
        this.theDatabase = db;
        // from https://enable-cors.org/server_expressjs.html
        this.router.use(function (request, response, next) {
            response.header("Content-Type", "application/json");
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "*");
            response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            next();
        });
        // Serve static pages from a particular path.
        this.server.use("/", express.static("./client"));
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        //// HANDLE CREATE, READ, UPDATE, AND DELETE OPERATIONS
        this.router.get("/menus", this.getResturants.bind(this));
        this.router.post("/menus", this.addResturaunt.bind(this));
        this.router.get("/menus/:rest", this.getResturauntItems.bind(this));
        this.router["delete"]("/menus/:rest", this.deleteResturaunt.bind(this));
        this.router.get("/menus/:rest/:item", [this.errorHandler.bind(this), this.getItem.bind(this)]);
        this.router.post("/menus/:rest", this.addItem.bind(this));
        this.router["delete"]("/menus/:rest/:item", this.deleteItem.bind(this));
        this.router.post("/login", this.login.bind(this));
        // this.router.get("/users/:userId/update", [this.errorHandler.bind(this), this.updateHandler.bind(this) ])
        // this.router.get("/users/:userId/delete", [this.errorHandler.bind(this), this.deleteHandler.bind(this) ])
        //// HANDLE ERRORS WITH A WILDCARD (*)
        // this.router.get("/*", this.errorHandler.bind(this))
        // Start up the counter endpoint at '/'.
        this.server.use("/", this.router);
    }
    MyServer.prototype.errorHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.isFound(request.params["item"] + "-" + request.body.name)
                        //	console.log("result from database.isFound: " + JSON.stringify(value));
                    ];
                    case 1:
                        value = _a.sent();
                        //	console.log("result from database.isFound: " + JSON.stringify(value));
                        if (!value) {
                            response.write(JSON.stringify({ "result": "error" }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Funciton to add a restaurant to the collection of restaurants in the DB
    //Parameters: JSON object with attribute(s): {name,dscr}
    //Returns: JSON object with attribute(s): {name,dscr}
    MyServer.prototype.addResturaunt = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("adding resturaunt");
                        return [4 /*yield*/, this.theDatabase.addResturaunt(request.body.name, request.body.dscr)];
                    case 1:
                        obj = _a.sent();
                        response.status(201).send(JSON.stringify(obj));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Adds an item to a restaurant in the DB 
    //Parameters: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
    MyServer.prototype.addItem = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("adding Item");
                        console.log(request.params.rest);
                        console.log(request.body.name);
                        return [4 /*yield*/, this.theDatabase.addItem(request.params.rest, request.body.name, request.body.cost, request.body.descr, request.body.type)];
                    case 1:
                        obj = _a.sent();
                        if (obj === -1) {
                            response.status(404).send("Resturaunt " + request.params.rest + " not found.");
                        }
                        response.status(201).send(JSON.stringify(obj));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Gets the list of restaurants from the DB 
    //Parameters: None
    //Returns: JSON object with attribute(s): {menus: [List of restuaurants]}
    MyServer.prototype.getResturants = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var rest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.getResturaunts()];
                    case 1:
                        rest = _a.sent();
                        response.status(201).send(JSON.stringify(rest));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Gets them menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant
    //Returns: JSON object with attribute(s): {items : [List of menu objects]}
    //EX: 
    MyServer.prototype.getResturauntItems = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var rest, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rest = request.params.rest;
                        return [4 /*yield*/, this.theDatabase.getResturauntItems(rest)];
                    case 1:
                        obj = _a.sent();
                        response.status(201).send(JSON.stringify(obj));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Gets an item from a  menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant 
    //item: the name of the item
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //EX: 
    MyServer.prototype.getItem = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var rest, item, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rest = request.params.rest;
                        item = request.params.item;
                        console.log(rest);
                        console.log(item);
                        return [4 /*yield*/, this.theDatabase.getItem(rest, item)
                            //Break apart the object returned by the DB:
                        ];
                    case 1:
                        obj = _a.sent();
                        //Break apart the object returned by the DB:
                        response.status(201).send(JSON.stringify(obj));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Deletes an item from a  menu of a restaurant in the DB 
    //Parameters: 
    //rest: the name of the restaurant, 
    //item: the name of the item
    //Returns: JSON object with attribute(s): {name,cost,dscr,rest,type}
    //EX: 
    MyServer.prototype.deleteItem = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var rest, name, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rest = request.params.rest;
                        name = request.params.item;
                        console.log("Deleting: " + rest + " " + name);
                        return [4 /*yield*/, this.theDatabase.deleteItem(rest, name)];
                    case 1:
                        obj = _a.sent();
                        response.status(201).send(JSON.stringify(obj));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteResturaunt = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var rest, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rest = request.params.rest;
                        return [4 /*yield*/, this.theDatabase.deleteResturaunt(rest)];
                    case 1:
                        obj = _a.sent();
                        response.status(201).send(JSON.stringify(obj));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.login = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var rest, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("login");
                        rest = request.body.code;
                        return [4 /*yield*/, this.theDatabase.login(rest)];
                    case 1:
                        obj = _a.sent();
                        if (!obj) {
                            response.sendStatus(404);
                        }
                        else {
                            response.status(200).send(obj.rest);
                        }
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    return MyServer;
}());
exports.MyServer = MyServer;
