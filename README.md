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


## updatemongo.js

Das Programm wird aufgerufen mit

```
node updatemongo.js
```

Liest alle JSON-Objekte der Collection, berechnet die keywords mit der Bibliotheksfunktion, und macht einen
Update des Objekts, indem es das meta keywords jedem Objekt hinzufügt

```
meta: {
   keywords: ["wort1","wort2",...]
} 
```

