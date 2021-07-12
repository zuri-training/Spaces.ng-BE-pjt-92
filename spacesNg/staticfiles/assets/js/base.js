// MOBILE NAV MENU
const menuIcon = document.getElementById("menu-icon");
const mobileNav = document.getElementById("mobile-nav");
const linksContainer = document.querySelector("#mobile-nav-links");
const links = document.querySelectorAll("#mobile-nav-links li");
const bar = document.getElementById("bars");

menuIcon.addEventListener("click", () => {
  document.body.classList.toggle("lock-scroll")
  bar.classList.toggle("rotate");
  mobileNav.classList.toggle("open");
  if (mobileNav.classList.contains("bg-overlay")) {
    mobileNav.classList.remove("bg-overlay");
  } else {
    mobileNav.classList.add("bg-overlay");
  }
  linksContainer.classList.toggle("nav-animation");
});

// POPULATING THE FORM WITH STATES AND LGAS
function loadState() {
  let dropdown = document.getElementById('state')
  dropdown.length = 0

  let defaultOption = document.createElement('option')
  defaultOption.text = 'Select State'
  defaultOption.value = ''

  dropdown.add(defaultOption)
  dropdown.selectedIndex = 0

  fetch('http://127.0.0.1:7200/static/NgStateAndLgaApi.txt')
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

  fetch('http://127.0.0.1:7200/static/NgStateAndLgaApi.txt')
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
  try {
    document.addEventListener("DOMContentLoaded", loadState);
  } catch (error) {
    
  }
try {
  
  document.addEventListener("DOMContentLoaded", function () {
     document.querySelector("#state").onchange = function () {
      if (this.value === 'FCT'){
          loadLga('FCT')
      } else {
          let stateName = this.value + ' State'
          loadLga(stateName)
      }
       }
     })
} catch (error) {
  
}

logout = document.getElementById('logout-modal')
logout_btn = document.getElementById('id_logout')
logout_btn.addEventListener('click', function() {
  logout.style.display = 'flex';
})
try {
  document.getElementById('cancel-logout').addEventListener('click', function(e) {
    e.preventDefault()
    logout.style.display = 'none';
  })
} catch (error) {
  
}
