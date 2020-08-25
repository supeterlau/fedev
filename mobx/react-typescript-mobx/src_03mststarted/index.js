import { types, getSnapshot } from 'mobx-state-tree'
import { applySnapshot, onSnapshot } from "mobx-state-tree"


// create two models

const Todo = types.model({
  name: '',
  done: false
}).actions(self => ({
  setName(newName) {
    self.name = newName
  },
  toggle() {
    self.done = !self.done
  }
}))

const User = types.model({
  name: ''
})

// model instances (state)

const john = User.create()
const eat = Todo.create()

const RootStore = types.model({
  users: types.map(User),
  // todos: types.optional(types.map(Todo), {})
  todos: types.map(Todo)
}).actions(self => ({
  addTodo(id, name) {
    // mymap.set(1, '1111')
    // Map { 1 => '1111' }
    self.todos.set(id, Todo.create({name}))
  }
}))

const store = RootStore.create({
  users: {}
})

console.log(`John: ${getSnapshot(john)}`)
console.log(`Eat TODO: ${getSnapshot(eat)}`)

store.addTodo(1, "Eat a cake")

console.log(`=> ${store.todos.get(1).done}`)
console.log(getSnapshot(store))

store.todos.get(1).toggle()

console.log(`=> ${store.todos.get(1).done}`)
console.log(getSnapshot(store))

// const eatError = Todo.create({name: "eat", done: 1})

// 方法 1
const store1 = RootStore.create({
  users: {},
  todos: {
    "1": {
      name: "Eat a cake",
      done: false
    }
  }
})

// 方法2
applySnapshot(store1, {
  users: {},
  todos: {
    "1": {
      name: "Eat a cake",
      done: false
    }
  }
})

// Time travel

var states = []
var currentFrame = -1

onSnapshot(store, snapshot => {
  if (currentFrame === states.length -1) {
    currentFrame++
    state.push(snapshot)
  }
})

let previousState = () => {
  if (currentFrame === 0) return
  currentFrame--
  applySnapshot(store, states[currentFrame])
}

let nextState = () => {
  if (currentFrame == states.length - 1) return
  currentFrame++
  applySnapshot(store, states[currentFrame])
}
