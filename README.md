# Projet 6 OpenClassrooms : site web FishEye
#### _Conception site dynamique et accessible_

 [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](https://forthebadge.com)

## Objectif
FishEye est un site web qui permet aux photographes indépendants de présenter leurs meilleurs travaux. L'objectif est de coder l'application, de façon accessible avec du HTML, CSS et JavaScript, alimenté par des données mockées au format json.

## Fonctionnalités :
##### Page d'accueil :
- Liste de tous les photographes avec leur nom, leur slogan, leur localisation, leur prix/heure et une image miniature de leur choix.
- Lorsque l'utilisateur clique sur la vignette d'un photographe, il est amené à sa page

##### Page des photographes (le contenu de la page sera généré de manière dynamique en fonction du photographe) :
- Affiche une galerie des travaux du photographe.
- Les photographes peuvent montrer à la fois des photos et des vidéos.
    - Dans le cas des vidéos, montrer une image miniature dans la galerie.
- Chaque média comprend un titre et un nombre de likes.
    - Lorsque l'utilisateur clique sur l'icône "Like", le nombre de likes affiché est incrémenté.
    - Le nombre de likes total d’un photographe doit correspondre à la somme des likes de chacun de ses médias.
- Les médias peuvent être triés par popularité ou par titre.
- Lorsque l'utilisateur clique sur un média, celui-ci doit s’ouvrir dans une lightbox :
    - Lorsque la lightbox est affichée, il y a une croix dans le coin pour fermer la fenêtre.
    - Des boutons de navigation permettent de passer d'un élément média à l'autre dans la lightbox (les utilisateurs peuvent cliquer sur ces boutons pour naviguer).
    - Les touches fléchées du clavier permettent également de naviguer entre les médias dans la lightbox.
- Afficher un bouton pour contacter le photographe.
    - Le formulaire de contact est une modale qui s'affiche par-dessus le reste.
    - Il comprend des champs pour les noms, l'adresse électronique et le message.
    - Plus tard, le bouton de contact enverra un message au photographe. Pour l'instant, seulement afficher le contenu des trois champs dans les logs de la console.

## Responsive design
Pour cette itération, pas besoin que le site soit responsive sur mobile.

## Accessibilité
"Il est très important que notre site soit accessible aux utilisateurs malvoyants. Toutes nos photos doivent comporter des descriptions textuelles, et vous devez les inclure dans la page. De plus, l'utilisateur doit pouvoir utiliser les commandes du clavier pour naviguer sur le site, comme les touches fléchées de la lightbox".
- Utilisez des éléments HTML "sémantiques" qui décrivent leur intention autant que possible, au lieu de mettre des éléments <div> et <span> partout.
- Lorsque vous devez créer un élément personnalisé, ajoutez des attributs ARIA pour décrire ce qu'il fait.
- Les images doivent présenter un attribut “alt”. Utilisez le titre des photos pour remplir cet attribut, et le nom du photographe dans le cas d’une photo de profil de photographe.
- Le code devrait passer les tests AChecker sans “known issue” (afin qu'il soit conforme aux WCAG).
- Toute la gestion des événements (par exemple, les clics et les pressions au clavier) doit être configurée (utilisez KeyboardEvent.key ou KeyboardEvent.code.).
- Utilisez un lecteur d'écran gratuit pour vous faire une idée de ce que représente l'utilisation du site pour une personne malvoyante.
