// creating elements in the header for each photographer
const photographerHeaderZone = document.querySelector('.photograph-header');

// geting parameters from the url to get the targeted id for each photographer
let params = new URL(document.location).searchParams;
let pageId = params.get("id");



