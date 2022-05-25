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

## MongoDB Index auf einen Array

Um eine Abfrage zu beschleunigen muss man einen Index auf die keywords (Array) machen

In der MongoDB Konsole ( im unteren Teil von Compass )

```
use xmldb
db.geonames.createIndex( { "meta.keywords": 1})
```

Das kann man mit einer relationalen Datenbank nicht machen - Index auf einen Array von Strings.

## Abfrage in der MongoDB

### Aufgabe

Selektiere (find) alle Datensätze (JSON) aus der Collection (Table) geonames, bei denen die keywords
mit den Worten "wort1" "wort2" "wort3" beginnen. ( Substring search )

Der find() String sieht dann so aus

```
{ $and: [{"meta.keywords":/^wort1/},{"meta.keywords":/^wort2/},{"meta.keywords":/^wort3/}]}
```

## Ähnlichkeitssuche

Hier wird das npm Paket Talisman verwendet mit dem Doitch Mokotoff Algorithmus

```
npm i -D talisman
```
