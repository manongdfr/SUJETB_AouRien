const fs = require('fs');
const path = require('path');
const readline = require('readline');
const prompt = require("prompt-sync")();
const extractionDesDonnees = require('./extraction des données 2');
const json_to_tab = require('./jsonVersTableau');
const recherche = require('./recherche');
const cheminVersFichierJSON = './data.json';
const select_question = require('./select_questions');
module.exports = {
    fs,
    path,
    readline,
    extractionDesDonnees,
    json_to_tab,
    cheminVersFichierJSON,
    recherche,
    prompt,
    select_question
};