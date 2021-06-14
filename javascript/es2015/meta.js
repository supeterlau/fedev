// 'use strict';

let handler = {
  get: function(target, name) {
    console.log('name: ', name)
    console.log('target: ', target)
    return name in target ? target[name] : 42
  }
}

let tour = new Proxy({}, handler)
tour.a = 100
console.log(tour.a, tour.b)

let revocable = Proxy.revocable({}, {
  get: function(target, name) {
    return '[[' + name + ']]'
  }
})

let proxy = revocable.proxy
console.log(proxy.notFound)

revocable.revoke()

try {
console.log(proxy.notFound)
} catch (e) {
  console.error(e)
}

const object1 = {}

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
})

// use strict 时抛出错误
object1.property1 = 42 * 2
console.log(object1.property1)

if (Reflect.defineProperty(object1, 'property2', {value: 42 * 2})) {
  console.log('define:', object1)
} else {
  console.log('failed')
}

console.log(Reflect.apply(''.charAt, 'ponies', [3]))

Reflect.has(Object, 'assign')

// String.prototype.charAt

const add = (x, y) => {
  console.log('x: ', x)
  console.log('y: ', y)
}

Reflect.apply(add, undefined, [100])