function select_questions(tab_result){
    print("Voici les resultat de votre recherche");
    console.table(tab_result);
    var tab_select = [] ;
    let choix = null;
    while (choix !== "stop" || choix !== null){
         choix = null;
        rl.question("Selectionner l'index de votre question ( stop pour arreter la selection) ", (reponse) => {
            if (reponse.toLowerCase() !== "stop" ) {
                if (reponse <= tab_result.length && reponse >= 0){
                    var entry = {
                        tag: tab_values[reponse]["tag"],
                        questionText: tab_values[reponse]["questionText"],
                        reponses: tab_values[reponse]["reponses"]
                    };
                    tab_select.push(entry);
                    console.log("Votre selection actuelle : ")
                    console.table(tab_select);
                }
                else {
                    console.log("Veuillez choisir un index valide")
                }
            }
            rl.close();
        });
    }
}