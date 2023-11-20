/**
 * Function that creates an article to display a photographer's image or video
 * @param {string} pictureNameRepository
 * @param {object} media
 * @returns {html}
 */
export const photographerSortTemplate = () => {
  const sorter = `
    <label for="sort-select">Trier par</label>
        <select name="media-sort" id="sort-select">
        <option value="">----</option>
        <option value="popularity">Popularité</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
        </select>
`;
  return sorter;
};
