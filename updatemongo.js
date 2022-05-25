/*
 * MongoDB Client
 * Klaus Ruhland, XML-und JSON- basierte Anwendungen
 * 
 * $npm install mongodb
 * http://mongodb.github.io/node-mongodb-native/4.0/
 */

const {MongoClient, ObjectId} = require('mongodb');
const {getKeywords} = require('./keywords');


const USERNAME="xmluser";
const PASSWORD="xml123";
const HOST="localhost";
const DBNAME="xmldb";

const URL=`mongodb://${USERNAME}:${PASSWORD}@${HOST}:27017/?authSource=${DBNAME}`;

const COLLECTION_NAME = "geonames";


async function main(){
    const client = new MongoClient(URL,{ useNewUrlParser: true, useUnifiedTopology: true });
    let counter = 1;
 
    try {
        await client.connect();
        const database = client.db(DBNAME);
        const collection = database.collection(COLLECTION_NAME);
        // Query with cursor
        const cursor = await collection.find({});

        while (await cursor.hasNext()) {
            console.log("Datensatz: "+counter);
            let doc = await cursor.next();
            let keywords= getKeywords(doc);

            let query = null;
            if ( typeof doc._id === 'object'){
                let object_id_string = doc._id.toString();
                query = {_id: ObjectId(object_id_string)};
            }
            else {
                query = {_id: doc._id};
            }
            if ( doc.meta === undefined ){
                let new_meta_fields = {$set: { "meta": { keywords: keywords}}};
                await collection.updateOne( query, new_meta_fields );
            }
            else {
                let new_meta_fields = {$set: { "meta.keywords": keywords}};
                await collection.updateOne( query, new_meta_fields );
            }


            console.log("Datensatz: "+counter+" Keywords: "+keywords);
            counter++;
        }
    } catch (e) {
        console.error("Error in main:"+e);
    } finally {
        console.log("Successfully updated: "+(counter-1));
        await client.close();
    }
}

main();
