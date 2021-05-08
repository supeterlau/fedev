const loadGithub = () => {
  let map = document.getElementById('github-commit-hotmap')
  // <iframe 
  //   src="https://github.com/users/supeterlau/contributions" 
  //   frameborder="0"
  //   loading="lazy"></iframe>
  let iframe = document.createElement('iframe')
  iframe.src = "https://github.com/users/supeterlau/contributions"
  iframe.frameborder = '0'
  map.appendChild(iframe)
}

window.onload = () => {
  // loadGithub()
}
