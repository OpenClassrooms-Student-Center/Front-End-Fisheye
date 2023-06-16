![FishEye ](ressources/assets/images/logo.png)

![html][html5-badge]
![css][css3-badge]
![sass][sass-badge]
![javascript][javascript-badge]
![vscode][vscode-badge]
![w3c][w3c-badge]

## Description FR :

Ceci est un projet réalisé dans le cadre du programme de formation Développeur Front-end JavaScript React chez [OpenClassrooms](https://openclassrooms.com/fr/paths/516-developpeur-dapplication-javascript-react)

## Maquettes :

Lien des maquettes : https://www.figma.com/file/PJYL4Y8G1Zi9TcyLUPijlK/UI-Design-FishEye-FR-(Copy)?type=design&t=6DLSmi1W43ivFFVC-0

Créez un site accessible pour une plateforme de photographes

#### Compétences évaluées :

-   Développer une application web modulaire avec des design patterns
-   Assurer l'accessibilité d'un site web
-   Ecrire du code JavaScript maintenable
-   Gérer les évènements d'un site avec JavaScript

### Situation (fictive) du projet :

Avec votre cheffe de projet Amanda et le Designer UI, vous venez de faire une réunion de lancement du projet avec un nouveau client, FishEye. FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux. Ils ont récemment levé des fonds et aimeraient mettre à jour leur site web.

Votre rôle est de développer tout l’aspect Front-end du site à partir de maquettes approuvées par le designer et de mettre un point d’honneur sur l’accessibilité.

### Cahier des charges :

#### Page d'accueil :

-   Liste de tous les photographes avec leur nom, leur slogan, leur
localisation, leur prix/heure et une image miniature de leur choix.
-   Lorsque l'utilisateur clique sur la vignette d'un photographe, il est
amené à sa page.

#### Pages des photographes :

-   Affiche une galerie des travaux du photographe.
-   Les photographes peuvent montrer à la fois des photos et des vidéos.
    -   Dans le cas des vidéos, montrer une image miniature dans la galerie.
-   Chaque média comprend un titre et un nombre de likes.
    -   Lorsque l'utilisateur clique sur l'icône "Like", le nombre de likes affiché est incrémenté.
    -   Le nombre de likes total d’un photographe doit correspondre à la somme des likes de chacun de ses médias.
-   Les médias peuvent être triés par popularité, date ou par titre.
-   Lorsque l'utilisateur clique sur un média, celui-ci doit s’ouvrir dans une lightbox :
    -    Lorsque la lightbox est affichée, il y a une croix dans le coin pour fermer la fenêtre.
    -   Des boutons de navigation permettent de passer d'un élément média à l'autre dans la lightbox (les utilisateurs peuvent cliquer sur ces boutons pour naviguer).
    - Les touches fléchées du clavier permettent également de naviguer entre les médias dans la lightbox.
-   Afficher un bouton pour contacter le photographe.
    -   Le formulaire de contact est une modale qui s'affiche par-dessus le reste.
    -   Il comprend des champs pour les noms, l'adresse électronique et le message.
    -   Plus tard, le bouton de contact enverra un message au photographe.
        Pour l'instant, afficher le contenu des trois champs dans les logs de la console.

#### Exigences supplémentaires :

-   Pour cette itération, pas besoin que le site soit responsive sur mobile.
-   L'accessibilité est clé :
    -   Utilisez des éléments HTML "sémantiques" qui décrivent leur intention autant que possible, au lieu de mettre des éléments <div> et <span> partout.
    -   Lorsque vous devez créer un élément personnalisé, ajoutez des attributs ARIA pour décrire ce qu'il fait.
    -   Les images doivent présenter un attribut “alt”. Utilisez le titre des photos pour remplir cet attribut, et le nom du photographe dans le cas d’une photo de profil de photographe.
    -   Le code devrait passer les tests [AChecker] (https://achecker.achecks.ca/checker/index.php) sans “known issue” (afin qu'il soit conforme aux WCAG).
    - Toute la gestion des événements (par exemple, les clics et les pressions au clavier) doit être configurée (utilisez KeyboardEvent.key ou KeyboardEvent.code.).
    - Utilisez un lecteur d'écran gratuit pour vous faire une idée de ce que représente l'utilisation du site pour une personne malvoyante.


## Développé avec :

-   [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de texte
-   [Sass](https://sass-lang.com/) - Préprocesseur CSS
-   [GitHub](https://github.com/) - Outil de gestion de versions
-   [GitHub Pages](https://pages.github.com/) - Outil d’hébergement
-   [Validateur W3C](https://validator.w3.org/) - Outils de détection des erreurs dans le code HTML et CSS
-   [AChecker](https://achecker.achecks.ca/checker/index.php) - Outil d'évaluation des erreurs, performances et bonnes pratiques d'accessibilité
