/*********************************************************************************
*
* This files permitted to link DB
*
/*********************************************************************************/

/**
 * function to link the database for easier calling up
 * @param {*} url
 * @returns {Promise<array>}
 */
const getDatas = async (url) => {
  try {
    const reponse = await fetch(`../../assets/data/${url}`);
    return await reponse.json();
  } catch (error) {
    console.log(error.message);
  }
};

export { getDatas };
