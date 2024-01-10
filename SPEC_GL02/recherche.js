function recherche(keyword, tag, tab) {
    const { cheminVersFichierJSON, json_to_tab } = require('./utilis');
    let tab_values = tab || json_to_tab(cheminVersFichierJSON);

    // Effectuer la recherche et le filtrage
    let result = tab_values.filter(item => {
        const tagMatch = tag ? item["tag"].includes(tag) : true;
        const keywordMatch = keyword ? item["questionText"].includes(keyword) : true;
        return tagMatch && keywordMatch;
    }).map(item => ({
        tag: item["tag"],
        questionText: item["questionText"],
        reponses: item["reponses"],
        typeDeQuestion: item["typeDeQuestion"],
        associations: item["associations"]
    }));

    // Vérifier si le résultat est vide et renvoyer un message d'erreur si c'est le cas
    if (result.length === 0) {
        return "Aucun résultat trouvé pour les critères de recherche spécifiés.";
    }

    return result;
}

module.exports = recherche;
