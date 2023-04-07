function displayChevron() {
    const btnFilter = document.querySelector('.filter_btn');
    const chevronUp = document.querySelector('.chevron-up');
    const chevronDown = document.querySelector('.chevron-down');

    if(btnFilter.classList.contains('visible')) {
        btnFilter.classList.remove('visible')
        chevronUp.classList.remove('active');
        chevronDown.classList.remove('disactive');
        
    } 
    else {
        btnFilter.classList.add('visible')
        chevronUp.classList.add('active');
        chevronDown.classList.add('disactive');
    }
}