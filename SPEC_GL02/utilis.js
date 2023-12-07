const fs = require('fs');
const path = require('path');
const readline = require('readline');
const prompt = require("prompt-sync")();
const extractionDesDonnees = require('./extraction des données 2');
const json_to_tab = require('./jsonVersTableau');
const recherche = require('./recherche');
const cheminVersFichierJSON = './data.json';
const select_question = require('./select_questions');
const create_exam = require('./SPEC3');
const pass_exam = require('./SPEC4')
const generateur_exam = require('./GenerateurExamens')
const generateur_graph = require('./GenerateurGraph')
const exam_type = require("./ExamenType")
const vcard = require("./VCARD")
module.exports = {
    fs,
    path,
    readline,
    extractionDesDonnees,
    json_to_tab,
    cheminVersFichierJSON,
    recherche,
    prompt,
    select_question,
    create_exam,
    pass_exam,
    generateur_exam,
    generateur_graph,
    exam_type,
    vcard

};