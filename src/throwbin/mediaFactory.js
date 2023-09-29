function createImage(data) {
	const {
		id,
		title,
		photographerId,
		likes,
		date,
		price,
		image,
		type = "image",
	} = data;

	const pictureURL = `assets/media/${photographerId}/${image}`;

	const createMediaCardDOM = () =>
		createElement({
			tagName: "article",
			attributes: {
				"data-id": id,
			},
			children: [
				{
					tagName: "img",
					attributes: {
						src: pictureURL,
						alt: "",
					},
				},
				{
					tagName: "div",
					className: "picture_info",
					children: [
						{
							tagName: "h2",
							innerText: title,
						},
						{
							tagName: "span",
							innerText: likes,
							className: "likes",
							children: [
								{
									tagName: "img",
									className: "icon",
									attributes: {
										src: "assets/icons/like.svg",
										alt: "likes",
									},
								},
							],
						},
					],
				},
			],
		});

	return {
		id,
		title,
		photographerId,
		likes,
		date,
		price,
		image,
		type,
		createMediaCardDOM,
	};
}

function createVideo(data) {
	const {
		id,
		title,
		photographerId,
		likes,
		date,
		price,
		video,
		type = "video",
		poster = `${video}_poster.png`,
	} = data;

	const pictureURL = `assets/media/${photographerId}/${poster}`;
	const videoURL = `assets/media/${photographerId}/${video}`;

	const createMediaCardDOM = () =>
		createElement({
			tagName: "article",
			attributes: {
				"data-id": id,
			},
			children: [
				{
					tagName: "img",
					attributes: {
						src: pictureURL,
						alt: "",
					},
				},
				{
					tagName: "div",
					className: "picture_info",
					children: [
						{
							tagName: "h2",
							innerText: title,
						},
						{
							tagName: "span",
							innerText: likes,
							className: "likes",
							children: [
								{
									tagName: "img",
									className: "icon",
									attributes: {
										src: "assets/icons/like.svg",
										alt: "likes",
									},
								},
							],
						},
					],
				},
			],
		});

	return {
		id,
		title,
		photographerId,
		likes,
		date,
		price,
		video,
		type,
		poster,
		createMediaCardDOM,
	};
}

function mediaFactory(data) {
	if (data?.video) return createVideo(data);

	if (data?.image) return createImage(data);

	throw "Unknown type format";
}
