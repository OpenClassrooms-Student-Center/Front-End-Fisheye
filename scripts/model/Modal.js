export default class Modal {
  constructor(data) {
    this._name = data;
    this.modal = document.getElementById('contact_modal');
  }

  get name() {
    return this._name;
  }

  displayModal() {
    this.modal.style.display = 'flex';
    this.modal.ariaHidden = 'false';
    const form = this.modal.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('.text');
      inputs.forEach((input) => {
        console.log(input.value);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (this.modal.ariaHidden === 'false' && e.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.modal.ariaHidden = 'true';
    this.modal.style.display = 'none';
  }
}
