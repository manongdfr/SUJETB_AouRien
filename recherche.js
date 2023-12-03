const {
    jsonVersTableau,
    cheminVersFichierJSON,
} = require('./utilis');

function recherche(keyword,tag ) {
    var tab_values = jsonVersTableau(cheminVersFichierJSON);
    var tab_result = [];
    for (var i = 0; i < tab_values.length; i++) {
        if (
            (tag && tab_values[i]["tag"].includes(tag)) &&
            (keyword && tab_values[i]["questionText"].includes(keyword))
        ) {
            var entry = {
                tag: tab_values[i]["tag"],
                questionText: tab_values[i]["questionText"],
                reponses: tab_values[i]["reponses"]
            };
            tab_result.push(entry);
        }
    }
    console.log(tab_values.length)
    return tab_result;

}
module.exports = recherche;
console.table(recherche("Nothing","U4"));
