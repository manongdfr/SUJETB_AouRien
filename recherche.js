const {
    fs,
    path,
    readline,
    extractionDesDonnees,
    json_to_tab,
    cheminVersFichierJSON,
} = require('./utilis');

function recherche(keyword,tag ) {
    var tab_values = json_to_tab(cheminVersFichierJSON);
    var tab_result = [];
    for (var i = 0; i < tab_values.length; i++) {
        if (
            (tag && tab_values[i]["tag"].includes(tag)) &&
            (keyword && tab_values[i]["questionText"].includes(keyword))
        ) {
            tab_result.push(tab_values[i]["questionText"]);
            tab_result.push(tab_values[i]["tag"]);

        }
    }
    console.log(tab_values.length)
    return tab_result;

}

console.table(recherche("Antarctica","U4"));
module.exports = recherche();