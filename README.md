# vorlesung07 MongoDB Schnittstelle

MongoDB Datenbank Zugriff und Keywords für die Suchmaschine

Installation der mongodb Bibliothek

```
npm init -y
npm i -D mongodb
```

oder später

```
npm update
```

Die Parameter für die Datenbank müssen in updatemongo.js geändert werden
Dies sind

```
const USERNAME="xmluser";
const PASSWORD="xml123";
const HOST="localhost";
const DBNAME="xmldb";

const URL=`mongodb://${USERNAME}:${PASSWORD}@${HOST}:27017/?authSource=${DBNAME}`;

const COLLECTION_NAME = "geonames";
```


## Keywords aus einem JSON Objekt berechnen

Das wird mit der Bibliotheksfunktion keywords.js erledigt.
