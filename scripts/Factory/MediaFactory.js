import Media from '../models/Media.js'


// Création de la MediaFactory avec la logique image / vidéo

export default class MediaFactory {

	static createFromJson(data) {
		const { title, image, video } = data
		const type = image === undefined ? 'video' : 'image'
		const src = image === undefined ? video : image
		return new Media(title, type, src)
	}

	static createDomElementFromMedia(media, photographerName ,isPreview = false, index = 0) {

		let elementType = media.type === 'image' ? 'img' : 'video'
		if (isPreview) {
			elementType = 'img'
		}

		let src = media.src
		if (media.type === 'video' && isPreview) {
			src = 'video_preview.svg'
		}

		const element = document.createElement(elementType)
		element.setAttribute('src', `assets/images/${photographerName}/` + src)
		element.setAttribute('alt', media.title)
		element.setAttribute('tabindex', '0')
		element.setAttribute('class', 'media_itself')
		element.setAttribute('data-index', index)
		element.setAttribute('data-type', media.type)
		element.setAttribute('data-original-src', `assets/images/${photographerName}/` + media.src)
		element.setAttribute('data-title', media.title)
		return element
	}
}

// static appeler sans instancier 