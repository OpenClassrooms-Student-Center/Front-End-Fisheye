# Fisheye - Projet 6 OpenClassrooms

Fisheye est une plateforme permettant de découvrir des photographes talentueux et leurs portfolios. Ce projet a été réalisé dans le cadre du parcours Développeur Front-end chez OpenClassrooms.

## Fonctionnalités principales

- **Exploration des photographes** : Parcourez une liste de photographes avec leurs informations et portfolios.
- **Tri des médias** : Classez les photos et vidéos par popularité, date ou titre.
- **Affichage dynamique** : Les données des photographes et médias sont chargées dynamiquement depuis un fichier JSON.
- **Lightbox interactive** : Visualisez les photos et vidéos en plein écran avec navigation.
- **Accessibilité** : Navigation optimisée pour les utilisateurs de clavier et lecteurs d'écran.

## Architecture des dossiers

Voici la structure des dossiers du projet :

```
Fisheye.github.io/
├── README.md                # Documentation du projet
├── index.html               # Page principale du site
├── css/                     # Feuilles de styles CSS
│   ├── styles.css           # Styles principaux du site
├── js/                      # Scripts JavaScript
│   ├── main.js              # Script principal pour les fonctionnalités
│   ├── photographer.js      # Gestion des données des photographes
│   ├── lightbox.js          # Gestion de la lightbox
├── data/                    # Données JSON
│   ├── photographers.json   # Données des photographes et médias
├── images/                  # Ressources graphiques
│   ├── photographers/       # Photos des photographes
└── .vscode/                 # Configuration de l'éditeur
    └── settings.json        # Paramètres spécifiques à ce projet
```

## Technologies utilisées

- **HTML5** : Structure des pages web.
- **CSS3** : Mise en page et styles.
- **JavaScript** : Gestion des interactions utilisateur et affichage dynamique des données.
- **JSON** : Stockage des données des photographes et médias.
- **Live Server** : Extension Visual Studio Code pour prévisualiser le site en temps réel.

## Instructions pour lancer le projet

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone <URL_DU_DEPOT>
   ```
2. Ouvrez le fichier `index.html` dans votre navigateur pour explorer le site.

## Auteur

Ce projet a été réalisé par Boyer Laurent dans le cadre du parcours Développeur Front-end chez OpenClassrooms.

