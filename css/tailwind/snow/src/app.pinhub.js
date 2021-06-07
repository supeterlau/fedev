console.log('Hi')

window.onload = () => {
  document.getElementById('hamburger').onclick = () => {
    const navToggle = document.getElementsByClassName('toggle')
    console.log(navToggle)    
    Array.from(navToggle).forEach(item => item.classList.toggle('hidden'))
  }
}