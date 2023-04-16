const qStr = window.location.search;
const urlParams = new URLSearchParams(qStr);
const id = urlParams.get('id');
const apiUrl = 'http://localhost:5500/photographer.html/' + id;