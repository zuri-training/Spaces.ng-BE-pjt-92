// HEADER STYLES
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



var checkP = function(){
    if (document.getElementById('password').value=== document.getElementById('confirm').value){
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML ='matching';
    }else{
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML ='not matching';
    }
}

