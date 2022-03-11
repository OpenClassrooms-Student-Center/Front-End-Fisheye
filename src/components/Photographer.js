import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../stylesheets/photographer.css";

function Photographer() {
  const location = useLocation();
  const { data } = location.state;
  const { name, id, city, country, tagline, portrait, price } = data;
  const [mediaList, setMediaList] = useState([]);
  const [likesPerMedium, setLikesPerMedium] = useState({});
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    // Get photographer's media
    function getMedia() {
      const raw = require("../data/photographers.json");
      const allPhotos = raw.media;
      let selectedMedia = allPhotos.filter((medium) => medium.photographerId === id);
      // On retourne les médias du photographe triés par popularité décroissante
      return selectedMedia.sort(sorter("likes"));
    }
    setMediaList(getMedia());

    // Total likes
    function likesCounter() {
      let counter = 0;
      getMedia().forEach((medium) => {
        // On crée un nouvel objet qui va nous permettre d'incrémenter le nombre de likes
        const likesObj = {};
        likesObj[medium.title] = medium.likes;
        setLikesPerMedium((likesPerMedium) => ({ ...likesPerMedium, ...likesObj }));
        // On additionne tous les likes des medias du photographe
        counter += medium.likes;
      });
      setTotalLikes(counter);
    }
    likesCounter();
  }, [id]);

  // Modal events
  function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  }

  function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }

  // Incrémentation des likes au clic sur un coeur
  function handleLike(title) {
    setTotalLikes(totalLikes + 1);
    const update = {};
    update[title] = likesPerMedium[title]++;
    setLikesPerMedium((likesPerMedium) => ({ ...likesPerMedium, update }));
  }

  // Fonction de tri de l'array selon un paramètre
  function sorter(parameter) {
    let sortOrder = parameter === "title" ? 1 : -1;

    return function (a, b) {
      let result = a[parameter] < b[parameter] ? -1 : a[parameter] > b[parameter] ? 1 : 0;
      return result * sortOrder;
    };
  }
  function handleFilters(e) {
    e.preventDefault();
    let parameter = e.target.value;
    let mediaListSorted = mediaList.sort(sorter(parameter));
    setMediaList([...mediaListSorted]);
  }

  // A l'envoi du formulaire de contact, les informations sont logguées dans la console
  function handleContactSubmit(e) {
    e.preventDefault();
    console.log(`Nom/Prénom : ${e.target[0].value} ${e.target[1].value}\nEmail : ${e.target[2].value}\nMessage : ${e.target[3].value}`);
  }

  return (
    <div className="h-full flex flex-col">
      <header>
        <Link to="/">
          <img src="assets/images/logo.png" alt="Fisheye logo" className="logo" />
        </Link>
      </header>

      <main id="main" className="flex flex-col">
        <div className="photograph-header">
          <div className="pl-4">
            <h2 className="text-[#D3573C]">{name}</h2>
            <h5 className="mb-4">{`${city}, ${country}`}</h5>
            <h6>{tagline}</h6>
          </div>
          <button className="contact_button" onClick={() => displayModal()}>
            Contactez-moi
          </button>
          <img src={`assets/photographers/photographers_ID/${portrait}`} alt={`${name}`} className="id-photog" />
        </div>

        {/* Mosaïque photo */}
        <section className="flex flex-col">
          <div className="ml-[100px] mt-5 mb-14 text-lg font-bold space-x-6">
            <span className="">Trier par</span>
            <select name="filters" id="filter-select" onChange={(e) => handleFilters(e)}>
              <option value="likes">Popularité</option>
              <option value="date">Date</option>
              <option value="title">Titre</option>
            </select>
          </div>
          <div className="photos-container">
            {/* Map sur tous les media du photographe */}
            {mediaList.map((medium, i) => {
              let photogFirstName = name.split(" ");
              photogFirstName = photogFirstName[0];

              // Tag en fonction du type de medium
              let contentType = medium.image ? (
                <img
                  className="min-w-full min-h-full object-cover rounded-[5px]"
                  src={`assets/photographers/${photogFirstName}/${medium.image}`}
                  alt={`${name} - ${medium.title}`}
                ></img>
              ) : (
                <video className="min-w-full min-h-full object-cover rounded-[5px]" src={`assets/photographers/${photogFirstName}/${medium.video}`}></video>
              );

              return (
                <div key={i} className="flex flex-col w-[350px] h-[300px]">
                  {contentType}
                  <div className="flex w-full justify-between pt-2">
                    <h5 className="max-w-[80%] flex-wrap">{medium.title}</h5>
                    <h5 className="cursor-pointer" onClick={() => handleLike(medium.title)}>
                      {likesPerMedium[medium.title]} &#9829;
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Corner tag */}
      <div className="photog-info-tag">
        <span>{totalLikes} &#9829;</span>
        <span>{price}€ / jour</span>
      </div>

      {/* Modal */}
      <div id="contact_modal">
        <div className="modal">
          <header>
            <div>
              <h2>
                Contactez-moi
                <br />
                {name}
              </h2>
            </div>
            <img src="assets/icons/close.svg" alt="" onClick={() => closeModal()} />
          </header>
          <form onSubmit={(e) => handleContactSubmit(e)}>
            <div>
              <label>Prénom</label>
              <input />
              <label>Nom</label>
              <input />
              <label>Email</label>
              <input />
              <label>Votre message</label>
              <textarea rows="5" className="w-full" />
            </div>
            <button className="contact_button">Envoyer</button>
          </form>
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default Photographer;
