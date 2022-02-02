design patterns

quand une appli évolue, elle se coomplexifie, on utilise des design pattern 

comprendre comment fonctionne l'asynchone JS
JS gere une seule chose à la fois.

Event loop:
de base JS execute de maniere synchrone et mono-thread le code, mais on peut lui demander de le faire des parties de code de maniere asynchrone.
comment? avec certaines fonctions faites pour ça.  setTimeout()
il les place dans une liste d'attente, qui s'appelle Event Loop.

setTimeout est la + répandue, elle prend en compte 2 paramètres: une fonction à éxécuter et un délai (en millisecondes).
```setTimeout(function() {
    console.log("I'm here!")
}, 5000);

console.log("Where are you?");```

getUserCardDOM()

cette fonction se trouve dans photographer.js
elle est contenue dans une autre fonction :
photographerFactory()
elle sert à créer les elements html qui constitue le main de l'index



getPhotographers()


