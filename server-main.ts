import { Database } from "./server/mongo-database"
import { MyServer } from "./server/myserver-routing"

const theDatabase = new Database() 
const theServer = new MyServer(theDatabase)

const port = process.env.PORT || 8080
theServer.listen(port)
