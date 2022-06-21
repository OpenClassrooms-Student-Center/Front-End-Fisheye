// Element du DOM
const btnSelected = document.querySelector('.sorter__selected')
const btnList = document.querySelectorAll('.option')
const sorterList = document.querySelector('.sorter__list')

btnSelected.addEventListener('click', () => {
    loadList()
})

function loadList() {
    sorterList.style.display = 'block'
    btnSelected.style.display = 'none'
}

btnList.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.id === 'like') {
            loadBtnSelected()
            changeBtnContent('Popularité')
        }

        if (btn.id === 'date') {
            loadBtnSelected()
            changeBtnContent('Date')
        }

        if (btn.id === 'title') {
            loadBtnSelected()
            changeBtnContent('Titre')
        }
    })
})

function loadBtnSelected() {
    sorterList.style.display = 'none'
    btnSelected.style.display = null
}

function changeBtnContent(content) {
    btnSelected.innerHTML = `<span>${content}</span><i
                        class="fa-solid fa-chevron-down"
                        aria-hidden="true"
                        data-fa-transform="right-32"
                    ></i>`
}
