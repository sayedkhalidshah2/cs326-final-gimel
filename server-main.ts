import { Database } from "./ts/mongo-database"
import { MyServer } from "./ts/myserver-routing"

const theDatabase = new Database() 
const theServer = new MyServer(theDatabase)

theServer.listen(8080)
