async function getProfile() {
    const photographers = [
        {
            "name": "Mimi Keel",
            "id": 243,
            "city": "London",
            "country": "UK",
            "tagline": "Voir le beau dans le quotidien",
            "price": 400,
            "portrait": "MimiKeel.jpg"
        }
    ]

    fetch("data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })

    return ({photographers}) 

}

async function displayData(photographers) {
    const photographHeader = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographerModel = profileFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographHeader.appendChild(userCardDOM);
    }); 
};

async function init() {
    const { photographers } = await getProfile();
    displayData(photographers);
};

init();

/////////////////////////////////////////////////////////////////

async function getMedias() {
    const medias = [
        {
			"id": 623534343,
			"photographerId": 243,
			"title": "Lonesome",
			"image": "Travel_Lonesome.jpg",
			"likes": 88,
			"date": "2019-02-03",
			"price": 45
		},
		{
			"id": 625025343,
			"photographerId": 243,
			"title": "Hillside Color",
			"image": "Travel_HillsideColor.jpg",
			"likes": 85,
			"date": "2019-04-03",
			"price": 45
		},
		{
			"id": 2525345343,
			"photographerId": 243,
			"title": "Wednesday Potrait",
			"image": "Portrait_Wednesday.jpg",
			"likes": 34,
			"date": "2019-04-07",
			"price": 45
		},
		{
			"id": 2523434634,
			"photographerId": 243,
			"title": "Nora Portrait",
			"image": "Portrait_Nora.jpg",
			"likes": 63,
			"date": "2019-04-07",
			"price": 45
		},
		{
			"id": 398847109,
			"photographerId": 243,
			"title": "Raw Black Portrait",
			"image": "Portrait_Background.jpg",
			"likes": 55,
			"date": "2019-06-20",
			"price": 45
		},
		{
			"id": 2534342,
			"photographerId": 243,
			"title": "Seaside Wedding",
			"image": "Event_SeasideWedding.jpg",
			"likes": 25,
			"date": "2019-06-21",
			"price": 45
		},
		{
			"id": 65235234,
			"photographerId": 243,
			"title": "Boulder Wedding",
			"image": "Event_PintoWedding.jpg",
			"likes": 52,
			"date": "2019-06-25",
			"price": 45
		},
		{
			"id": 23523434,
			"photographerId": 243,
			"title": "Benevides Wedding",
			"image": "Event_BenevidesWedding.jpg",
			"likes": 77,
			"date": "2019-06-28",
			"price": 45
		},
		{
			"id": 5234343,
			"photographerId": 243,
			"title": "Wild horses in the mountains",
			"video": "Animals_Wild_Horses_in_the_mountains.mp4",
			"likes": 142,
			"date": "2019-08-23",
			"price": 60
		  },
		{
			"id": 95234343,
			"photographerId": 243,
			"title": "Rainbow Bird",
			"image": "Animals_Rainbow.jpg",
			"likes": 59,
			"date": "2019-07-02",
			"price": 60
		}
    ]

    fetch("data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })

    return ({medias}) 
}

async function displayDataMedias(medias) {
    const photographMedias = document.querySelector(".photograph-medias");

    medias.forEach((media) => {
        const mediaModel = mediasFactory(media);
        const mediaCardDOM = mediaModel.getMediasCardDOM();
        photographMedias.appendChild(mediaCardDOM);
    }); 
};

async function initMedias() {
    const { medias } = await getMedias();
    displayDataMedias(medias);
};

initMedias();