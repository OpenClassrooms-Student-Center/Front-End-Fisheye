import {mediaPhotographer, mediaData} from '../pages/photographerController.js'

const popularityBtn = document.querySelector('.selector__element1')
const dateBtn = document.querySelector('.selector__element2')
const titleBtn = document.querySelector('.selector__element3')

// --- Utils function --- //

// Sort data by date
const sortByDate = (data) => {
    const copyData = [...data]

    return copyData.sort((a, b) => {
        const dateA = new Date(a.date).valueOf();
        const dateB = new Date(b.date).valueOf();
        if( dateA > dateB) {
            return -1;
        }
        if( dateA < dateB) {
            return 1;
        }
    
        return 0
    });
}


// Listener sort by likes
popularityBtn.addEventListener("click", function () {
    const popularityArray = Array.from(mediaPhotographer);
    popularityArray.sort(function (a, b) {
        return b.likes - a.likes
    });

    mediaData(popularityArray)
})

// Listener sort by title

titleBtn.addEventListener("click", function () {
    const titleArray = Array.from(mediaPhotographer);
    titleArray.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if( titleA < titleB) {
            return -1;
        }
        if( titleA > titleB) {
            return 1;
        }
    
        return 0
    });
    mediaData(titleArray)
})

// Listener sort by date

dateBtn.addEventListener('click', function () {
    const dataSorted = sortByDate(mediaPhotographer)
    mediaData(dataSorted)
})

// Sort menu 

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.material-symbols-outlined');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');


    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('material-symbols-outlined-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('material-symbols-outlined-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });
            
            option.classList.add('active');
        })
    })    
})