// Element du DOM
const btnSelected = document.querySelector('.sorter__selected')
const btnList = document.querySelectorAll('.option')
const sorterList = document.querySelector('.sorter__list')

function loadList() {
    sorterList.style.display = 'block'
    btnSelected.style.display = 'none'
}

function loadBtn() {
    btnSelected.style.display = null
    sorterList.style.display = 'none'
}

function changeBtnContent(content) {
    btnSelected.innerHTML = `<span>${content}</span><i
                        class="fa-solid fa-chevron-down"
                        aria-hidden="true"
                        data-fa-transform="right-32"
                    ></i>`
}

btnSelected.addEventListener('click', () => {
    loadList()
})

btnList.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.id === 'like') {
            loadBtn()
            changeBtnContent('Popularité')
        } else if (btn.id === 'date') {
            loadBtn()
            changeBtnContent('Date')
        } else if (btn.id === 'title') {
            loadBtn()
            changeBtnContent('Titre')
        } else {
            throw new Error('Unknown type format')
        }
    })
})
