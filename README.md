# FishEye Front-End
FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux. 
Je suis en charge de la réalisation du code HTML,CSS/SCSS,JavaScript.

## Démarrer le projet
Télécharger le repot et exécuter un ```npm install package.json``` afin d'installer les packages suivants:

```
    "@babel/core": "^7.19.0",
    "@babel/preset-env": "^7.19.0",
    "babel-loader": "^8.2.5",
    "core-js": "^3.25.0",
    "css-loader": "^6.7.1",
    "eslint": "^8.23.1",
    "postcss": "^8.4.16",
    "postcss-loader": "^7.0.1",
    "postcss-preset-env": "^7.8.1",
    "regenerator-runtime": "^0.13.9",
    "sass": "^1.54.8",
    "sass-loader": "^13.0.2",
    "style-loader": "^3.3.1",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-merge": "^5.8.0"
    "wicg-inert": "^3.1.2"
```


Le projet est configuré afin que Babel transcompile le JS en code JS compatible sur les navigateurs disposant de > 0.5% de part de marché. (```.browserslistrc```).
ESLINT est configurer via le fichier ```.eslintrc.js``` pour les règles de code.

 Le reste de la configuration ce situe dans ```webpack.common.js```

Vous pouvez executer ensuite le projet soit avec ```npm run dev``` ou ```npm run build```

- Mode Dev: La page 404 et la gestion de cette dernière est désactivée afin de pouvoir consulter facilement les erreurs, plus d'informations lié aux console.log sont disponibles pour faciliter le développement.

- Mode Build: La page 404 est activé en cas d'erreur critique, seul les erreur et les succès sont disponible dans les logs.


## Fonctionnalités / Contrainte

- Intégrer la maquette.
- Assurer l'accessibilité du site web.
- Gérer les évènements du site avec JavaScript.
- Développer une application web modulaire avec des design patterns.


## Outils  utilisés

- Github
- Github Pages
- Visual Studio Code
- Gimp
- Npm
- Les packages utilisées dans package.json
- Validateur W3C pour [HTML](https://validator.w3.org/) et [CSS](https://jigsaw.w3.org/css-validator/#validate_by_upload)

## Langages

HTML, SCSS/CSS, JavaScript
