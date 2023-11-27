const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const extractionDesDonnees = () => {
    const cheminDuRepertoire = './SujetB_data';
    const questionsData = [];

    return new Promise((resolve, reject) => {
        fs.readdir(cheminDuRepertoire, (err, fichiers) => {
            if (err) {
                console.error("Erreur lors de la lecture du répertoire :", err);
                reject(err);
                return;
            }

            const fichiersGift = fichiers.filter(fichier => path.extname(fichier) === '.gift');
            let filesProcessed = 0;

            const processFile = (fichier, contenu) => {
                const questions = contenu.split('\n\n');

                questions.forEach(questionData => {
                    if (!questionData.startsWith('//')) {
                        const tagMatch = questionData.match(/::(.*?)::/);
                        const tag = tagMatch ? tagMatch[1].trim() : null;
                        const questionTextMatch = questionData.match(/::.*?::(.*?)[\r\n]/);
                        const questionText = questionTextMatch ? questionTextMatch[1].trim() : null;

                        // Extraire les réponses entre {}
                        const reponsesMatches = questionData.match(/\{(.*?)\}/gs);
                        const reponses = reponsesMatches
                            ? reponsesMatches[0].split('\n')
                                .map(match => match.trim())
                                .filter(line => line !== '' && line !== '{}') // Supprimer les lignes vides et les lignes avec {}
                                .map(line => line.replace(/[{}]/g, '')) // Supprimer { et }
                            : [];

                        const cleanedQuestionText = questionText
                            ? questionText.replace(/\[html\]/g, '').replace(/{.*?}/g, '').replace(/<br>/g, '')
                            : null;

                        if (tag !== null && cleanedQuestionText !== null) {
                            questionsData.push({ tag, questionText: cleanedQuestionText, reponses });
                        }
                    }
                });

                filesProcessed++;

                if (filesProcessed === fichiersGift.length) {
                    resolve(questionsData);
                }
            };

            const askUserToDisplayQuestionsData = () => {
                rl.question('Voulez-vous enregistrer les données dans un fichier JSON ? (oui/non) ', (reponse) => {
                    if (reponse.toLowerCase() === 'oui') {
                        writeDataToJsonFile(questionsData);
                    } else {
                        console.log('Données non enregistrées.');
                    }

                    rl.close();
                });
            };

            const writeDataToJsonFile = (data) => {
                const jsonData = JSON.stringify(data, null, 2);
                const jsonFilePath = 'data.json';

                fs.writeFile(jsonFilePath, jsonData, 'utf-8', (err) => {
                    if (err) {
                        console.error("Erreur lors de l'écriture dans le fichier JSON :", err);
                    } else {
                        console.log(`Données enregistrées dans ${jsonFilePath}.`);
                    }
                });
            };

            fichiersGift.forEach((fichier) => {
                const cheminDuFichier = path.join(cheminDuRepertoire, fichier);

                fs.readFile(cheminDuFichier, 'utf-8', (err, contenu) => {
                    if (err) {
                        console.error(`Erreur lors de la lecture du fichier ${fichier} :`, err);
                    } else {
                        processFile(fichier, contenu);
                    }
                });
            });

            // Demander à l'utilisateur s'il veut enregistrer les données dans un fichier JSON.
            askUserToDisplayQuestionsData();
        });
    });
};

module.exports = extractionDesDonnees;
extractionDesDonnees()