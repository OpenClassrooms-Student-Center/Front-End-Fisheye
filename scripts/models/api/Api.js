const getDatas = async (url) => {
  try {
    const reponse = await fetch(`../../assets/data/${url}`);
    const datas = await reponse.json();
    // console.log(datas);
    return datas;
  } catch (error) {
    console.log(error.message);
  }
};

export { getDatas };
