

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
        like.addEventListener('click', (e) => {
            e.preventDefault()
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

function paginate(value) {
    let search = document.location.search
    if ('URLSearchParams' in window) {
        let searchParams = new URLSearchParams(search)
        searchParams.set('page', value)
        document.location.search = searchParams.toString()
    }
  }