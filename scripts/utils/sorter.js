
    var select = document.getElementById('select');

    //sort media display by order when select value is title date àr number of likes
    select.addEventListener('change', function () {
        var selectedValue = this.value;
        var media = document.querySelectorAll('.mediaCard');
        var mediaArray = Array.from(media);
        var sortedMedia = mediaArray.sort(function (a, b) {
            if (selectedValue === 'title') {
                return a.querySelector('#title').innerHTML.localeCompare(b.querySelector('#title').innerHTML);
            } else if (selectedValue === 'date') {
                return new Date(b.querySelector('#date').innerHTML) - new Date(a.querySelector('#date').innerHTML);
            } else if (selectedValue === 'popularity') {
                return b.querySelector('#likeNmbr').innerHTML - a.querySelector('#likeNmbr').innerHTML;  
            }
                
        });
        sortedMedia.forEach(function (media) {
            media.parentElement.appendChild(media);
        });
    });
    

    

