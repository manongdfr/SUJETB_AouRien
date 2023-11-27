const fs = require('fs');
const path = require('path');
const readline = require('readline');

const extractionDesDonnees = require('./extraction_des_donnees_2');
const json_to_tab = require('./json_to_tab');

const cheminVersFichierJSON = './data.json';

module.exports = {
    fs,
    path,
    readline,
    extractionDesDonnees,
    json_to_tab,
    cheminVersFichierJSON,
};

