'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myserver-routing';

const theDatabase = new Database('dergoose'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(8080);
