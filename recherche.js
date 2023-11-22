function recherche(){
    const extractionDesDonnees = require('./extraction des données');


// Appeler la fonction et attendre la résolution de la promesse
    extractionDesDonnees()
        .then(questionsData => {
            // Stocker les données extraites dans une variable
            const extractedData = questionsData;

            // Afficher les données
            console.log(extractedData);
        })
        .catch(error => console.error(error));


}
recherche();