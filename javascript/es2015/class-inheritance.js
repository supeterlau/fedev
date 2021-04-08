// Class inheritance

// https://javascript.info/class-inheritance

class Animal {
  constructor(name) {
    this.speed = 0
    this.name = name
  }

  run(speed) {
    this.speed = speed
    console.log(`${this.name} runs with speed ${this.speed}.`)
  }

  stop() {
    this.speed = 0
    console.log(`${this.name} stands still.`)
  }
}

/*
 * Animal 的 prototype 是 Animal.prototype
 * 创建实例 new Animal('some name')
 */

let a1 = new Animal('Cat')
a1.run(100)
a1.stop()

class Feak extends Animal {
  jump() {
    console.log(`${this.name} can jump`)
  }
}

class Rabbit extends Animal {
  _eyeColor = 'red'

  hide() {
    console.log(`${this.name} hides!`)
  }

  set eyeColor (value) {
    this._eyeColor = value
  }

  get eyeColor () {
    return this._eyeColor
  }

  constructor(name, eyeColor='blue') {
    super(name)
    this._eyeColor = eyeColor
  }
}

let r1 = new Rabbit('Rbt')
r1.run(50)
r1.hide()
console.log(r1.eyeColor)

Rabbit.prototype.__proto__ = Feak.prototype
// Rabbit.prototype[[Prototype]] = Feak.prototype

let r2 = new Rabbit('Rbt2')
r2.run(60)
r2.jump()
console.log(r2.eyeColor)
/*
 * extends 关键字将 Rabbit.prototype.[[Prototype]] 设置为 Animal.prototype
 */

// https://stackoverflow.com/questions/9451881/prototype-vs-prototype-what-is-the-difference-mycons-proto-myco javascript - [[Prototype]] vs prototype: ..what is the difference? (MyCons.__proto__ === MyCons.prototype) equals FALSE - Stack Overflow

// https://javascript.info/private-protected-properties-methods

// https://javascript.info/static-properties-methods
/*
 * 静态方法 static info (msg) { console.log(msg) }
 *
 * 等同于 SomeClass.info = function(msg) { console.log(msg) }
 *
 * // for statics
 * alert(Rabbit.__proto__ === Animal); // true
 * // for regular methods
 * alert(Rabbit.prototype.__proto__ === Animal.prototype);
 *
 */


// https://javascript.info/classes Classes

// super https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420 “Super” and “Extends” In JavaScript ES6 - Understanding The Tough Parts | by Anurag Majumdar | Beginner's Guide to Mobile Web Development | Medium

class Fish extends Animal {
  constructor (sea, name) {
    super(name)
    this.sea = sea
  }

  info() {
    console.log(`${this.name} is a fish in ${this.sea}`)
  }
}


let f = new Fish('Black sea', 'John')
f.info()

// https://dev.to/bhagatparwinder/classes-in-js-public-private-and-protected-1lok
