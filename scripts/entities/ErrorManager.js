class ErrorManager {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }

  getErrorMessageDOM() {
    return `<p>${this.errorMessage}</p>`;
  }
}
