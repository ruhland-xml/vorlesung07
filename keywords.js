// Extrahiert alle Keywords aus einem JSON-Objekt obj
// Ergebnis ist ein Array keywords
// Rekursives Durchlaufen eines JSON-Objects ohne das meta

const fs = require('fs');

function extractKeywordsFromJson(obj, keywords) {
    for(var key in obj) {
        if( key !== "meta" && obj[key] instanceof Object) { 
            extractKeywordsFromJson(obj[key],keywords);
        } else {
            let value = obj[key];
            if ( typeof value ===  "string" ){
                newString = value.replace(/[`~!@#$%^&*()_|+\-=?;:,.'"<>\{\}\[\]\\\/]/gi, ' ')
                let stringArray = newString.split(/(\s+)/).filter( e => e.trim().length > 0);
                for ( let i=0; i< stringArray.length; i++ ){
                    let singleString = stringArray[i].toLowerCase();
                    if ( singleString.length>0 && keywords.includes(singleString) === false )
                        keywords.push(singleString);
                }
            }
        };
    }
};

module.exports = {
    getKeywords: function(obj) { 
        let keywords = [];
        extractKeywordsFromJson(obj,keywords);
        return keywords;
    }
}


