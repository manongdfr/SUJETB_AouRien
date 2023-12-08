const extractionDesDonnees = () => {
    const fs = require('fs');
    const path = require('path');
    const cheminDuRepertoire = '../SujetB_data';
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

                        //...

                        let typeDeQuestion = null;

// Logique pour déterminer le type de question
                        if (reponses.length > 0 && reponses.some(response => response.includes('->'))) {
                            typeDeQuestion = 'Question à association';
                        } else if (reponses.length === 1 && (reponses[0].includes('=') || reponses[0].includes('~'))) {
                            typeDeQuestion = 'Question à trou';
                        } else if (reponses.length === 1) {
                            typeDeQuestion = 'Texte à trou';
                        } else if (cleanedQuestionText && cleanedQuestionText.includes('_')) {
                            typeDeQuestion = 'Question à trou'; // Ajout du critère "_"
                        }else if (reponses.length > 1) {
                            typeDeQuestion = 'Question classique';
                        }

//...


                        if (tag !== null && cleanedQuestionText !== null) {
                            if (typeDeQuestion === 'Question à association') {
                                const associations = reponses.map(association => {
                                    const parts = association.split('->').map(part => part.trim());
                                    return { left: parts[0], right: parts[1] };
                                });

                                questionsData.push({ tag, questionText: cleanedQuestionText, associations,reponses, typeDeQuestion });
                            } else {
                                questionsData.push({ tag, questionText: cleanedQuestionText, reponses, typeDeQuestion });
                            }
                        }
                    }
                });
                filesProcessed++;
                if (filesProcessed === fichiersGift.length) {
                    resolve(questionsData);
                }
            };

            const writeDataToJsonFile = (data) => {
                const jsonData = JSON.stringify(data, null, 2);
                const jsonFilePath = 'data.json';

                fs.writeFile(jsonFilePath, jsonData, 'utf-8', (err) => {
                    if (err) {
                        console.error("Erreur lors de l'écriture dans le fichier JSON :", err);
                    } else {

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
                        if (filesProcessed === fichiersGift.length) {
                            writeDataToJsonFile(questionsData);
                        }
                    }
                });
            });
        });
    });
};

module.exports = extractionDesDonnees;
