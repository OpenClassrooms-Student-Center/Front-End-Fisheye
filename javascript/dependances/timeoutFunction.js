/*fonction de temporisation permet d'attendre un temps donné en ms*/
export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
