// for ... of : iterate an iterable like array

let animals = ['🐔', '🐷', '🐑', '🐇']
let names = ['Gertrude', 'Henry', 'Melvin', 'Billy Bob']

for (let animal of animals) {
  let nameIdx = Math.floor(Math.random() * names.length)
  console.log(`${names[nameIdx]} the ${animal}`)
}

// Strings are also iterable

let str = 'rstuvwxyz'

for (let char of str) {
  console.log(char.toUpperCase().repeat(3))
}

// other iterable: maps, sets, generators, DOM node collections and the arguments object

// for ... in : iterate over properties of an object (keys)

let oldCar = {
  make: 'Toyota',
  model: 'Tercel',
  year: '1996'
}

for (let key in oldCar) {
  console.log(`${key} --> ${oldCar[key]}`)
}

// iterate index values of iterable (like string , array)

for (let idx in str) {
  console.log(`Idx of ${str[idx]}: ${idx}`)
}
