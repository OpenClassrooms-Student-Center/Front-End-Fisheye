
async function getUrlParameter(parameter) {
    const fullurl = window.location.href;
    console.log(fullurl);

}
async function init() {
    const test = await getUrlParameter("id");
}


init();
