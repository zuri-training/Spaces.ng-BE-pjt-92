// ADD FACILITY

const checkboxWrap = document.querySelector('.checkbox-wrap')
const addFacility = document.getElementById('other-facilities')
const addBtn = document.querySelector('.add')
let tag = document.getElementById('id_facilities')
document.onclick = function(){
  let facilities = document.querySelectorAll('input[type=checkbox]')
  tag.value = ''
  facilities.forEach(function(item) {
    if (item.checked){
      tag.value += item.name + ','
    }
  })
}
addBtn.addEventListener('click', (event) => {
  if (document.querySelector('#other-facilities').value.length > 0) {
    let facility = addFacility.value;
    let newDiv = document.createElement('div')
    newDiv.classList.add('checkbox-item')
    newDiv.innerHTML = `<input type="checkbox" name="${facility}" checked>`
    newPTag = document.createElement('p')
    newPTag.innerText = facility
    newDiv.appendChild(newPTag)
    checkboxWrap.appendChild(newDiv)
    event.preventDefault()
    document.getElementById('other-facilities').value = ""
  } else {
    alert("Please type in the facilities you'd like to add before clicking on the ADD button.")
    event.preventDefault()
  }
})


//  IMAGE STUFF
function previewImg(event) {
  var reader = new FileReader();
  reader.onload = function() {
    var output = document.getElementById('space-image');
    output.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0])
}

//  FACILITIES STUFF
