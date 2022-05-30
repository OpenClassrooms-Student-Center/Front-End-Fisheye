var btnLike = document.querySelectorAll('#btnLike');
var likeNmbr = document.querySelectorAll('#likeNmbr');

for (const btn of btnLike){
    btn.addEventListener('click', function(){
        likeNmbr.innerText++;
    })  
}

console.log('like.js loaded')