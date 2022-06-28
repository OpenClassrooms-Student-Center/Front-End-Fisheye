/**
 *
 * @param {string} URL
 * @returns{Object} data
 */
export const getData = async (URL) => {
  try {
    /** @var Response */
    const response = await fetch(URL);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("!!Error Json file : ", error);
  }
};
