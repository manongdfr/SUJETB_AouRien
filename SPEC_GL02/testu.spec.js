// Importez Jasmine

const Jasmine = require('jasmine');
const jasmine = new Jasmine();

// Chargez le fichier de configuration de Jasmine
jasmine.loadConfigFile('jasmine.json');

// Exécutez les tests Jasmine
jasmine.execute();

const {
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
    generateur_exam
} = require('./utilis');

// Définissez la fonction de mélange
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Tests Jasmine
describe('fonction shuffle', () => {
    it('doit mélanger les éléments du tableau', () => {
        // Crée un tableau
        const inputArray = Array.from({ length: 10 }, (_, index) => index + 1);

        // Copie le tableau pour comparer après le mélange
        const originalArray = [...inputArray];

        // Mélange le tableau
        const shuffledArray = shuffle(inputArray);

        // Vérifie que le tableau original et le tableau mélangé sont différents
        expect(originalArray).not.toEqual(shuffledArray);

        // Vérifie que le tableau mélangé a la même longueur que le tableau original
        expect(shuffledArray.length).toEqual(originalArray.length);

        // Vérifie que tous les éléments du tableau original sont présents dans le tableau mélangé
        originalArray.forEach((element) => {
            expect(shuffledArray).toContain(element);
        });
    });
});
describe('fonction recherche', () => {
    it("chercher les questions qui contiennent le tag et/ou le titre renseigné par l'utilisateur", () => {
        // Créez un ensemble de questions de test
        const questions = [
            { titre: 'Question 1', tag: 'JavaScript' },
            { titre: 'Question 2', tag: 'Node.js' },
            { titre: 'Question 3', tag: 'JavaScript' },
            { titre: 'Question 4', tag: 'HTML' },
            { titre: 'Question 5', tag: 'CSS' },
        ];

        // Effectuez une recherche avec un tag spécifique
        const resultatsTag = recherche( '','JavaScript', questions);

        // Vérifiez que les résultats contiennent les questions avec le tag spécifique
        expect(resultatsTag).toContain({ titre: 'Question 1', tag: 'JavaScript' });
        expect(resultatsTag).toContain({ titre: 'Question 3', tag: 'JavaScript' });

        // Effectuez une recherche avec un titre spécifique
        const resultatsTitre = recherche(questions, '', 'Question 4');

        // Vérifiez que les résultats contiennent la question avec le titre spécifique
        expect(resultatsTitre).toContain({ titre: 'Question 4', tag: 'HTML' });

        // Effectuez une recherche avec à la fois un tag et un titre spécifiques
        const resultatsTagEtTitre = rechercheQuestions(questions, 'JavaScript', 'Question 2');

        // Vérifiez que les résultats contiennent la question avec le tag et le titre spécifiques
        expect(resultatsTagEtTitre).toContain({ titre: 'Question 2', tag: 'Node.js' });
    });
});

