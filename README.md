
# SUJETB_AouRien



Pour exécuter correctement le logiciel répondant aux demandes du projet B de GL02, suivez les étapes ci-dessous :

## 1. Cloner le répertoire

Assurez-vous que le chemin de votre terminal pointe vers le répertoire `SPEC_GL02` de ce dépôt GitHub. C'est à l'intérieur de ce répertoire que sont organisés les différents programmes, dont le fichier principal (`main.js`).

```bash
git clone https://github.com/votre-utilisateur/SPEC_GL02.git
cd SPEC_GL02
```

## 2. Installer les dépendances

Le logiciel utilise plusieurs librairies, dont VegaLite, pour interagir avec la console. Pour installer ces dépendances, exécutez la commande suivante dans votre terminal (assurez-vous que votre chemin est correct) :

```bash
npm install vega-lite vega vega-embed prompt-sync
```

Attendez que tous les modules soient téléchargés.

## 3. Exécuter le logiciel

Une fois les dépendances installées, exécutez le logiciel en utilisant la commande suivante :

```bash
node main.js
```

Suivez les instructions affichées dans la console pour interagir avec le programme.

---

*Note : Assurez-vous d'avoir Node.js installé sur votre machine avant de suivre ces étapes.*

