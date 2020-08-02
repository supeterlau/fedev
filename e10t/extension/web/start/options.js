let buttonDiv = document.getElementById('buttonDiv')

const kBtnColors = [
  '#3aa757',
  '#e8453c',
  '#f9bb2d',
  '#4688f1',
]

function constructOptions(colors) {
  for (let color of colors) {
    let button = document.createElement('button')
    button.style.backgroundColor = color
    button.style.height = '30px'
    button.style.width = '30px'

    button.addEventListener('click', function() {
      chrome.storage.sync.set({color}, function() {
        console.log('color is ' + color)
      })
    })
    buttonDiv.appendChild(button)
  }
}

constructOptions(kBtnColors)