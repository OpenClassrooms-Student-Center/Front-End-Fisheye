export default class Modal {
  constructor(data) {
    this._name = data;
    this.modal = document.getElementById('contact_modal');
    this.keyPress = undefined;
    this.formEvent = undefined;
    this.body = document.querySelector('body');
  }

  get name() {
    return this._name;
  }

  displayModal() {
    this.modal.style.display = 'flex';
    this.modal.ariaHidden = 'false';
    this.body.style.overflow = 'hidden';
    const form = this.modal.querySelector('form');
    this.formEvent = form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('.text');
      inputs.forEach((input) => {
        console.log(input.value);
      });
    });

    this.keyPress = document.addEventListener('keydown', (e) => {
      if (this.modal.ariaHidden === 'false' && e.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.modal.ariaHidden = 'true';
    this.modal.style.display = 'none';
    document.removeEventListener('keydown', this.keyPress);
    document.removeEventListener('submit', this.formEvent, false);
    this.body.style.overflow = 'scroll';
  }
}
