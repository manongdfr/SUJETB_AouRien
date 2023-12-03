const fs = require('fs');
const path = require('path');
const readline = require('readline');
const prompt = require("prompt-sync")();
const extractionDesDonnees = require('./extraction des données 2');
const jsonVersTableau = require('./jsonVersTableau');
const recherche = require('./recherche');
const cheminVersFichierJSON = './data.json';

module.exports = {
    fs,
    path,
    readline,
    extractionDesDonnees,
    jsonVersTableau,
    cheminVersFichierJSON,
    recherche,
    prompt
};