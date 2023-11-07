//Mettre le code JavaScript lié à la page photographer.html
// const url = new URLSearchParams(document.location.search);
// const id = parseInt(url.get('id'));
function initPhotograph() {
  // const pName = document.getElementById('photographerName');
  // console.log(pName);
  const photographers = document.querySelectorAll('.photographer');
  for (let i = 0; i < photographers.length; i++) {
    photographers[i].addEventListener('click', function (event) {
      const id = photographers[i].getAttribute('data-id');
      fetch(`../../pages/photographer.html?id=${id}`);
      console.log('coucou' + id);
    });
  }
}
export { initPhotograph };
