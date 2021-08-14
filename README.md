Projet GROUPOMANIA
=

Avant de démarrer
===

Cloner le dépôt ou bien télécharger le et décompressez le fichier ZIP

Ce qu'il faut savoir sur l'application
====

L'application utilise une base de donnée Mysql et contient les deux parties Frontend et Backend dans des dossiers séparés. Afin de pouvoir la faire fonctionner il faudra donc utiliser chacun de ces dossiers séparément, la procédure qui suit vous indiquera la marche à suivre. Cette application a été conçue grâce à différents framework et packages, aussi bien pour la partie Frontend que pour la partie Backend, qui seront donc nécessaires afin de pouvoir la faire fonctionner.

Un compte administrateur a été créé et mis en place, et ce afin de pouvoir gérer le site et au besoin permettre à d'autres utilisateurs d'acquérir les droits administrateurs. Le détail de ce compte se trouve dans le document qui a été fourni au responsable du projet.

Installation
====

Démarrez votre serveur MYSQL avec un logiciel comme WAMP, XAMP ou autre, puis importez le fichier SQL de la base de donnée Groupomania.

**Partie BACKEND** :

Depuis le dossier Backend , ouvrez votre terminal et exécutez `npm install` pour démarrer l'installation du package npm. Une fois fait veuillez lancer la commande `npm init`. Vous pouvez maintenant programmer l'exécution du serveur avec node server ou nodemon. Le serveur doit fonctionner sur le localhost via le port par défaut 3000, si jamais vous remarquez que ce n'est pas le cas veuillez regarder sur votre console quel port est utilisé par le serveur lors de l'exécution, il peut arriver qu'un autre port soit parfois utilisé (il est imprimé par la console), par exemple `Listening on port 3001`.

**Partie FRONTEND**:

Depuis le dossier Frontend, ouvrez votre terminal et exécuter `npm install` pour démarrer l'installation du package npm, une fois fait veuillez lancer la commande `npm init`.

Utilisation
====

**Partie BACKEND** :

Pour lancer l'exécution du serveur exécutez la commande `npm start` ou `node serve` suivant que vous ayez programmé votre serveur avec nodemon ou non.

**Partie FRONTEND** :

Pour lancer l'exécution du serveur exécutez la commande `npm run serve`. Vous pouvez ensuite accéder à l'application grâce à votre navigateur en passant par l'adresse http://localhost:8080/

Technologies
====

Voici la liste des principales technologies qui permettent de faire fonctionner l'application. N'hésitez pas à regarder le fichier `package.json` de chacun des dossiers pour voir la liste de toutes celles installées.

**Partie BACKEND** :

- NodeJs pour le serveur : "https://nodejs.org/"
- Mysql pour la base de donnée : "https://www.mysql.com/fr/"
- Sequelize pour gérér la connexion serveur-base de donnée : "https://sequelize.org/master/manual/getting-started.html"

**Partie FRONTEND**:

- L'application utilise le framework javascript VueJS 3 : "https://vue3-fr.netlify.app/"
- Elle utilise aussi les deux autres dépendances de VueJS à savoir :
  -  VueCli "https://cli.vuejs.org/"
  -  VueX : "https://vuex.vuejs.org/fr/"
- Booststrap 5 : "https://getbootstrap.com/docs/5.0/getting-started/introduction/"
- Fontawesome pour les icones : "https://getbootstrap.com/docs/5.0/getting-started/introduction/"

Vous voilà maintenant prêt à pouvoir utiliser notre application !
