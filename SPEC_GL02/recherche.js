function recherche(keyword, tag, tab) {
    const { cheminVersFichierJSON, json_to_tab } = require('./utilis');
    let tab_values = tab || json_to_tab(cheminVersFichierJSON);

    // Retourne le résultat du filtrage et du mappage du tableau 'tab_values'.
    return tab_values.filter(item => {
        const tagMatch = tag ? item["tag"].includes(tag) : true;
        const keywordMatch = keyword ? item["questionText"].includes(keyword) : true;

        // Retourne 'true' si l'élément correspond à la fois au 'tag' et au 'keyword'.
        return tagMatch && keywordMatch;
    }).map(item => ({
        // Mappage de chaque élément filtré pour structurer les données retournées.
        tag: item["tag"],
        questionText: item["questionText"],
        reponses: item["reponses"],
        typeDeQuestion: item["typeDeQuestion"],
        associations: item["associations"]
    }));
}

module.exports = recherche;