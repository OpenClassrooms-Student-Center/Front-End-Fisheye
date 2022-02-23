class MediaBuilderFactory {

    build(media)
    {
        if(media.image) {
            console.log('MediaImageBuilder(media)');
        }
        if(media.video) {
            console.log('MediaImageBuilder(media');
        }
    }
}
