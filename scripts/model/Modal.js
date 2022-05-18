export default class Modal {
  constructor(data) {
    this._name = data;
    this.modal = document.getElementById('contact_modal');
    this.body = document.querySelector('body');
  }

  get name() {
    return this._name;
  }

  submitModal(e) {
    e.preventDefault();
    const form = this.modal.querySelector('form');
    const inputs = form.querySelectorAll('.text');
    inputs.forEach((input) => {
      console.log(input.value);
    });
    this.closeModal();
  }

  keyClose(e) {
    if (this.modal.ariaHidden === 'false' && e.code === 'Escape') {
      this.closeModal();
    }
  }

  imgClose() {
    this.closeModal();
  }

  displayModal() {
    this.modal.style.display = 'flex';
    this.modal.ariaHidden = 'false';
    this.body.style.overflow = 'hidden';
    const form = this.modal.querySelector('form');
    const iconClose = document.querySelector('.modal header img');
    form.addEventListener('submit', this.submitModal);
    iconClose.addEventListener('click', this.closeModal.bind(this));
    document.addEventListener('keydown', this.keyClose.bind(this));
  }

  closeModal() {
    this.modal.ariaHidden = 'true';
    this.modal.style.display = 'none';
    document.removeEventListener('submit', this.submitModal);
    document.removeEventListener('keydown', this.closeModal);
    const iconClose = document.querySelector('.modal header img');
    iconClose.removeEventListener('click', this.imgClose);
    this.body.style.overflow = 'scroll';
  }
}
