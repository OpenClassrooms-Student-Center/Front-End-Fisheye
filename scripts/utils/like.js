setTimeout(function () {

    const likeBtn = document.querySelectorAll("#btnLike");
    var likeNmbr = document.querySelectorAll("#likeNmbr");
    var totalLike = document.getElementById("totalLike");
  
    let total = 0;
    for (let i = 0; i < likeNmbr.length; i++) {
      total += parseInt(likeNmbr[i].innerHTML);
    }
    totalLike.innerHTML = total;

  
    for (const btn of likeBtn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        //increase parent element of like button by 1
        var parent = this.parentElement;
        var count = parent.querySelector("#likeNmbr");
        count.innerHTML = parseInt(count.innerHTML) + 1;
        totalLike.innerHTML = parseInt(totalLike.innerHTML) + 1;
        console.log('click')

    });
    }

   console.log('like.js loaded')
}, 500)