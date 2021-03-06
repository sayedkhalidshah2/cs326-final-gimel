"use strict";
exports.__esModule = true;
var mongo_database_1 = require("./server/mongo-database");
var myserver_routing_1 = require("./server/myserver-routing");
var theDatabase = new mongo_database_1.Database();
var theServer = new myserver_routing_1.MyServer(theDatabase);
var port = process.env.PORT;
theServer.listen(port);
