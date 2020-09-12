// 'use strict'

let person1 = {
  name: 'John Doe',
  getName: function() {
    console.log('this point to :', this)
    console.log(this.name)
  }
}

let person2 = {
  name: 'Bill Jobs'
}

// The this inside the setTimeout() function sets to the global object in non-strict mode and undefined in the strict mode.

setTimeout(person1.getName, 1000)

// setTimeout(person1.getName(), 1000)

// fix 1

setTimeout(() => person1.getName(), 1000)

// fix 2

setTimeout(person1.getName.bind(person1), 1000)

setTimeout(person1.getName.bind(person2), 1000)

let addPair1 = {
  lh: 3,
  rh: 4,
  add: function(extra1, extra2) { return this.lh + this.rh + extra1 + extra2 }
}

let addPair2 = {
  lh: 100,
  rh: 300
}

console.log('use apply: ', addPair1.add.apply(addPair2, [80, 90]))
console.log('use call: ', addPair1.add.call(addPair2, 80, 90))