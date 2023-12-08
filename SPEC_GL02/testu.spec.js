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
    generateur_exam,
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
            { tag: 'JavaScript',questionText: 'Question 1' },
            { tag: 'Node.js',questionText: 'Question 2'  },
            { tag: 'JavaScript', questionText: 'Question 3' },
            {tag: 'HTML', questionText: 'Question 4'  },
            { tag: 'CSS', questionText: 'Question 5' },
        ];

        // Effectuez une recherche avec un tag spécifique
        const resultatsTag = recherche( '', 'JavaScript', questions);

        // Vérifiez que les résultats contiennent les questions avec le tag spécifique
        expect(resultatsTag).toContain({ tag: 'JavaScript' ,questionText: 'Question 1', reponses: undefined, typeDeQuestion: undefined, associations: undefined});
        expect(resultatsTag).toContain({ tag: 'JavaScript', questionText: 'Question 3' , reponses: undefined, typeDeQuestion: undefined, associations: undefined});

        // Effectuez une recherche avec un texte de question spécifique
        const resultatsTexte = recherche( 'Question 4', '', questions);

        // Vérifiez que les résultats contiennent la question avec le texte spécifique
        expect(resultatsTexte).toContain({ tag: 'HTML',questionText: 'Question 4', reponses: undefined, typeDeQuestion: undefined, associations: undefined});

        // Effectuez une recherche avec à la fois un tag et un texte de question spécifiques
        const resultatsTagEtTexte = recherche( 'Question 2', 'Node.js',questions);

        // Vérifiez que les résultats contiennent la question avec le tag et le texte spécifiques
        expect(resultatsTagEtTexte).toContain({ tag: 'Node.js',questionText: 'Question 2', reponses: undefined, typeDeQuestion: undefined, associations: undefined});

    });
});

