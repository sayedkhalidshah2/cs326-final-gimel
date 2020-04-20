"use strict"

import { Database } from "./src/ts/mongo-database"
import { MyServer } from "./src/ts/myserver-routing"

const theDatabase = new Database() 
const theServer = new MyServer(theDatabase)

theServer.listen(8080)
