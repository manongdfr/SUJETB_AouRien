async function GenerateurExamens() {
    const fs = require('fs').promises;
    const path = require('path');
    const {prompt} = require("./utilis");


    // Cette fonction va générer aléatoirement un examen parmi toutes les données de questions (ListTotQ.txt)
    async function copierLignesAleatoires(indiceExamen) {
        try {
            // Lit le contenu du fichier 'ListTotQ.txt' situé dans le répertoire ListeExamens. Il contient toutes les données de questions. Son format .txt permet de ne pas le comptabiliser en tant que .gift (poserait problème pour les autres SPECs)
            const dossierAExplorer = "../ListeExamens";
            const cheminFichierSource = path.join(dossierAExplorer, 'ListTotQ.txt');
            const contenuSource = await fs.readFile(cheminFichierSource, 'utf8');

            // Divise le contenu de 'ListTotQ.txt' par ligne
            const lignes = contenuSource.split('\n');

            // Mélange les lignes du fichier 
            const indicesMelanges = [...Array(lignes.length).keys()].sort(() => Math.random() - 0.5);

            // Génère un nombre aléatoire entre 15 et 20 (nombre de questions possibles d'un examen)
            var entierAleatoire = Math.floor(Math.random() * (20 - 15 + 1)) + 15;

            // Sélectionne le nombre de lignes du fichier mélangé correspondant au nombre généré 
            const indicesSelectionnes = indicesMelanges.slice(0, entierAleatoire);

            // Organise dans une structure le contenu qui sera écrit dans un nouveau fichier
            const contenuNouveauFichier = indicesSelectionnes.map(index => lignes[index]).join('\n');

            // Détermine le nom du nouveau fichier 'examenX.gift' en fonction de la valeur de 'indiceExamen'
            const nomNouveauFichier = `examen${indiceExamen}.gift`;
            // Détermine le chemin dans lequel sera créé le fichier
            const cheminNouveauFichier = path.join(dossierAExplorer, nomNouveauFichier);
            // Écrit le contenu dans le nouveau fichier
            await fs.writeFile(cheminNouveauFichier, contenuNouveauFichier, 'utf8');
            //Indique à l'utilisateur si l'opération a fonctionné ou non
            console.log(`${nomNouveauFichier} a été créé avec succès.`);
        } catch (erreur) {
            console.error("Une erreur s'est produite :", erreur);
        }
    }

    // Demande à l'utilisateur le nombre de fichiers qu'il souhaite créer
    var choix = prompt("Veuillez indiquer le nombre de fichiers à créer : ")
    const nbFichiers = parseInt(choix);
    // Appelle la fonction N fois (N étant le nombre sélectionné par l'utilisateur)
    for (let indiceExamen = 1; indiceExamen <= nbFichiers; indiceExamen++) {
        copierLignesAleatoires(indiceExamen);
    }
console.log("Taper sur fléche du haut pour revenir au menu")
    // Ferme l'interface de lecture et met fin au programme
}

module.exports = GenerateurExamens;