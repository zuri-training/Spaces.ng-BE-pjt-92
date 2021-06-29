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




const submitBtn= document.querySelector('.login__btn');
const email= document.querySelector('.email');
const password= document.querySelector('.password');
const emailError= document.querySelector('.email__error');
const passwordError=document.querySelector('.password__error');
const emailCheck= document.querySelector('.email_check');
const emailExclamation= document.querySelector('.email_exclamation');
const passwordCheck= document.querySelector('.password_check');
const passwordExclamation= document.querySelector('.password_exclamation');
const form=document.querySelector('.login__form')

//VERIFICATION FOR EACH INPUT
try {
const emailInput=document.forms['form']['login'];
const passwordInput=document.forms['form']['password'];
    emailInput.addEventListener('textInput',verifyEmail());
    
    function verifyEmail(){
        if(email.value.length>=8){
            setSuccessMessage(emailValue)
        }
    }
    
    passwordInput.addEventListener('textInput',verifyPassword());
} catch (error) {
    // console.log('Error: ', error)
}

function verifyPassword(){
    if(password.value.length>5){
        setPasswordSuccess();
    }
}
//ENDS HERE

//SUBMIT VERIFICATION
try {
    form.addEventListener('change',(e)=>{
        // e.preventDefault();
        checkInputElements();
    })
} catch (error) {
    // console.log('Error: ', error)
}

function checkInputElements(){
    const emailValue=email.value.trim();
    const passwordValue=password.value.trim();

    if(emailValue===''){
        setErrorMessage();
    }
    else if(!emailValue){
        setErrorMessage();
        emailError.textContent='Incorrect email address'
    }
    else{
        setSuccessMessage(emailValue);
        
    }
    if(passwordValue===''){
        const parent= document.querySelector('.input__section');
        setPasswordError()

    }
    else if(passwordValue.length<5){
        setPasswordError()
        passwordError.textContent='Incorrect password'
    }else if(passwordValue.includes()){

    }
    else{
        setPasswordSuccess();
    }


}






//EMAIL ERROR FUNCTION
function setErrorMessage(){
    emailError.style.display='block'
    email.style.borderColor= 'red';
    emailExclamation.style.display='block';
    emailCheck.style.display='none';
}
//EMAIL SUCCESS MESSAGE
function setSuccessMessage(email){
    if(email){
        const email= document.querySelector('.email');
        emailError.style.display='none';
        email.style.borderColor= 'green';
        emailExclamation.style.display='none';
        emailCheck.style.display='block';
    }
        
}


//PASSWORD ERROR MESSAGE
function setPasswordError(){
    passwordError.style.display='';
    password.style.borderColor= 'red';
    passwordError.style.display='block'
    password.style.borderColor= 'red';
    passwordExclamation.style.display='block';
    passwordCheck.style.display='none';
}
//PASSWORD SUCCESS
function setPasswordSuccess(){
    passwordError.style.display='';
    password.style.borderColor= 'green';
    passwordCheck.style.display='block';
    passwordExclamation.style.display='none';
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