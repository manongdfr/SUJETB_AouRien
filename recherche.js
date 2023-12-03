function recherche(keyword,tag ) {
    const {
        cheminVersFichierJSON,
        json_to_tab,
    } = require('./utilis');

    var tab_values = json_to_tab(cheminVersFichierJSON);
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
    return tab_result;

}
module.exports = recherche;

