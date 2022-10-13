export async function getAllData() {
  let photographersData
  await fetch("../data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographersData = data
    })
    .catch((err) => {
      console.error(err)
    })
  return photographersData
}
