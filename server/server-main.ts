import { Database } from "./mongo-database"
import { MyServer } from "./myserver-routing"

const theDatabase = new Database() 
const theServer = new MyServer(theDatabase)

var port = process.env.PORT || 8080
theServer.listen(port)
