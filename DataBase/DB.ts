import { MongoClient } from "mongodb";
require('custom-env').env('yourfeed')

class DB {
    uri: string
    DBclient: MongoClient

    constructor() {
        this.uri = process.env.DB_URL
        this.DBclient = new MongoClient(this.uri, { maxPoolSize: 10 });
    }
}

export default DB