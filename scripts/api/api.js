// FETCH PHOTOGRAPHES
export async function getPhotographers() {
    let photographers = await fetch('data/photographers.json')
    if (photographers.ok === true) {
        return photographers.json();
    }
    throw new Error ('Impossible de contacter le serveur')
}
