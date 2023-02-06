export default function updateLoaderText() {
    // L'élément ne doit être lu qu'une seule fois au moment du chargement, on le fait donc disparaître une fois les photographes affichés
    const loadingTextElement = document.querySelector('.loading-text')
    loadingTextElement.textContent = "La page est complètement chargée, vous pouvez naviguer dessus."
}