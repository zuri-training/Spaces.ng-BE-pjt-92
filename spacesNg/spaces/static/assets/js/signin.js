// MODAL
const modal = document.getElementById('logout-modal')
const closeModal = document.querySelector('.modal-close')

closeModal.addEventListener('click', () => {
    modal.style.display = 'none'
})

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }