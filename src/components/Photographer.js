import "../stylesheets/photographer.css";

function Photographer() {
  // Modal events
  function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  }

  function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }

  return (
    <>
      <header>
        <img src="assets/images/logo.png" className="logo" />
      </header>
      <main id="main">
        <div className="photograph-header">
          <button className="contact_button" onClick={() => displayModal()}>
            Contactez-moi
          </button>
        </div>
      </main>
      <div id="contact_modal">
        <div className="modal">
          <header>
            <h2>Contactez-moi</h2>
            <img src="assets/icons/close.svg" onClick={() => closeModal()} />
          </header>
          <form>
            <div>
              <label>Prénom</label>
              <input />
            </div>
            <button className="contact_button">Envoyer</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Photographer;
