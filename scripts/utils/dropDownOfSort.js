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

    btnSelected.setAttribute('aria-expanded', 'true')
}

btnList.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.id === 'like') {
            loadBtnSelected()
            changeBtnContent('Popularité')

            btnList[0].setAttribute('aria-selected', 'true')
            btnList[1].setAttribute('aria-selected', 'false')
            btnList[2].setAttribute('aria-selected', 'false')

            sorterList.setAttribute('aria-activedescendant', `${btn.id}`)
        }

        if (btn.id === 'date') {
            loadBtnSelected()
            changeBtnContent('Date')

            btnList[1].setAttribute('aria-selected', 'true')
            btnList[0].setAttribute('aria-selected', 'false')
            btnList[2].setAttribute('aria-selected', 'false')

            sorterList.setAttribute('aria-activedescendant', `${btn.id}`)
        }

        if (btn.id === 'title') {
            loadBtnSelected()
            changeBtnContent('Titre')

            btnList[2].setAttribute('aria-selected', 'true')
            btnList[0].setAttribute('aria-selected', 'false')
            btnList[1].setAttribute('aria-selected', 'false')

            sorterList.setAttribute('aria-activedescendant', `${btn.id}`)
        }
    })
})

function loadBtnSelected() {
    sorterList.style.display = 'none'
    btnSelected.style.display = null

    btnSelected.setAttribute('aria-expanded', 'false')
}

function changeBtnContent(content) {
    btnSelected.innerHTML = `<span>${content}</span><i
                        class="fa-solid fa-chevron-down"
                        aria-hidden="true"
                        data-fa-transform="right-32"
                    ></i>`
}
