// eslint-disable-next-line no-unused-vars
async function getPhotographers () {
    const photographersData = fetch('./data/photographers.json')
      .then(function (res) {
        if (res.ok) {
          return res.json()
        }
      })
      .catch(function (err) {
        console.log(err)
      })
    return photographersData
  }
