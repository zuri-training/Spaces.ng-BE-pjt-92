// MOBILE NAV MENU
const menuIcon = document.getElementById('menu-icon');
const mobileNav = document.getElementById('mobile-nav');
const linksContainer = document.querySelector('#mobile-nav-links')
const links = document.querySelectorAll('#mobile-nav-links li');
const bar = document.getElementById('bars')

menuIcon.addEventListener('click', () => { 
    bar.classList.toggle('rotate')
    mobileNav.classList.toggle('open')
    if(mobileNav.classList.contains('bg-overlay')){
    mobileNav.classList.remove('bg-overlay')
    }else{ 
    mobileNav.classList.add('bg-overlay')
    }
    linksContainer.classList.toggle('nav-animation')
})
function lockScroll() {
    document.body.classList.toggle('lock-scroll');
}


// POPULATING THE FORM WITH STATES AND LGAS

function loadState() {
    let dropdown = document.getElementById('state')
    dropdown.length = 0

    let defaultOption = document.createElement('option')
    defaultOption.text = 'Select State'
    defaultOption.value = ''

    dropdown.add(defaultOption)
    dropdown.selectedIndex = 0

    fetch('/static/NgStateAndLgaApi.txt')
    .then(response => response.json())
    .then(data => {
        let option;

        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option')
            option.text = data[i].state.name
            if (option.text !== 'FCT') {
                option.value = option.text.slice(0, option.text.length - 6)
            } else {
                option.value = 'FCT'
            }
            dropdown.add(option)
        }
    })
    .catch(error => {
        console.log('Fetch Error: ', error)
    })
}


function loadLga(stateName) {
    let dropdown = document.getElementById('lga')
    dropdown.length = 0

    let defaultOption = document.createElement('option')
    defaultOption.text = 'Select LGA'
    defaultOption.value = ''

    dropdown.add(defaultOption)
    dropdown.selectedIndex = 0

    fetch('/static/NgStateAndLgaApi.txt')
    .then(response => response.json())
    .then(data => {
        let option;
        for (let i = 0; i < data.length; i++) {
            if (stateName === data[i].state.name) {
                for (let j = 0; j < data[i].state.locals.length; j++) {
                    option = document.createElement('option')
                    option.text = data[i].state.locals[j].name
                    option.value = data[i].state.locals[j].name
                    dropdown.add(option)
                }
            }
        }
    })
    .catch(error => {
        console.log('Fetch Error: ', error)
    })
}




document.addEventListener('DOMContentLoaded', loadState)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#state').onchange = function () {
        if (this.value === 'FCT'){
            loadLga('FCT')
        } else {
            let stateName = this.value + ' State'
            loadLga(stateName)
        }
    }
})


// END 

//  ASIDE ITEMS FOR SMALLER SCREENS
const asideItem = document.querySelectorAll('.aside-item-title')
const filterWrap = document.querySelectorAll('.filter-wrap')

for (i = 0; i < asideItem.length; i++){
    if(document.documentElement.clientWidth < 1150) {
        let openFilter = asideItem[i];
        openFilter.addEventListener('click', () => {
            if(openFilter.nextElementSibling.classList.contains('close-filter')){
                openFilter.nextElementSibling.classList.add ('open-filter')
                openFilter.nextElementSibling.classList.remove ('close-filter')
            }else if(openFilter.nextElementSibling.classList.contains('open-filter')) {
                openFilter.nextElementSibling.classList.remove ('open-filter')
                openFilter.nextElementSibling.classList.add ('close-filter')
            }
        })
    }
}

// SPACE-ITEM LIKE ICON

const spacesItem = document.querySelectorAll('.spaces-item')

function likeBtn (){
    [...spacesItem].forEach((item) => {
        let like = item.children[2]
        like.addEventListener('click', () => {
            if (like.innerHTML === '<i class="far fa-heart"></i>'){
                like.innerHTML = '<i class="fas fa-heart liked"></i>';
            }
            else if (like.innerHTML === '<i class="fas fa-heart liked"></i>'){
                like.innerHTML = '<i class="far fa-heart"></i>';
            }

        })
    })    
}
likeBtn();


// FUNCTION FOR NO RESULTS

const noResultWrap = document.querySelector('.no-results')
const main = document.querySelector('.main')

function noSearch () {
    if (noResultWrap.style.display !== 'none') {
        if(document.documentElement.clientWidth < 7600){
            main.style.paddingBottom = '50px'
        }else{
            main.style.paddingBottom = '150px'
        } 
    }
}
try {
    noSearch();
} catch (error) {
    
}

// MODAL

const modal = document.getElementById('logout-modal')
const closeModal = document.querySelector('.modal-close')
const cancelModal = document.getElementById('close')
const logout = document.getElementById('id_logout')
try {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none'
    })
    cancelModal.addEventListener('click', (e) => {
        e.preventDefault()
        modal.style.display = 'none'
    })
} catch (error) {
    // console.log('Error: ', error)
}

try {
    logout.addEventListener('click', () => {
        modal.style.display = 'flex'
    })
} catch (error) {
    // console.log('Error: ', error)
}