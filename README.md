# Un API Nodejs

## Description
Ce projet est une API Node.js construite pour FACILITER la création de d'un API nodeJS. Il y a à peu près tout dans ce projet. Vous pouvez ensuite adapter cet API en ajoutant d'autre fonctionnalité.
En ajoutant de model ,Service ,Controller et enfin route, puis l'importer dans app.js

## Fonctionnalités Principales
- Authentification avec JWT
- Envoyer un email
- et d'autres fonctionnalités d'un  API


## Prérequis
Avant de commencer, assurez-vous d'avoir Node.js et npm installés sur votre machine. en testant `npm version`
Vous pouvez aussi installer MongoDB desktop

## Installation
1. Clonez ce dépôt : `git clone https://github.com/Torien-TORIEN/API-NodeJS.git`
2. Accédez au répertoire du projet : `cd Projet_NodeJS`
3. Installez les dépendances : `npm install`

## Configuration
1. Créez un fichier `.env` à la racine du projet.
2. Ajoutez les variables d'environnement nécessaires, telles que :
	PORT=3000
	MONGO_URI=mongodb://localhost:27017/Nodejs_db //si vous avez MongoDB local
	JWT_SECRET=VotreCleSecreteJWT //Sans double cotes
	EMAIL="adrese pour l'envoie d'un email"
	PWD="motdepasse de cet email"

NB: Il faut bien configurer l'email en question pour qu'on puisse l'utiliser pour l'envoi d'un e-mail automatique.



## Utilisation
1. Démarrez l'API : `npm start`
2. L'API sera accessible à l'adresse : `http://localhost:3000`

## Endpoints API
Vous pouvez tester les requettes dans le fichier `test.api.http` avec VScode

## Tests
- Utilisez la commande : `npm test`



## Auteurs
- TORIEN(@Torien-TORIEN)

## Licence
© Torien Decembre 2023
