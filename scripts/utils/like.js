setTimeout(function () {

    document.querySelector('#btnLike').addEventListener('click', function () {
        likeNbr = document.getElementById('#likeNmbr').value;
        likeNbr++;
        console.log('click like');
    });
   console.log('like.js loaded')
}, 1000)