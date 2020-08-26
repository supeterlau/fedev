import {types, getEnv} from 'mobx-state-tree'

const Todo = types
  .model({
    title: ''
  })
  .actions(self => ({
    setTitle(newTitle) {
      getEnv(self).logger.log('Change Title to ' + newTitle)
      self.title = newTitle
    }
  }))

const Store = types.model({
  todos: types.array(Todo)
})

const logger = {
  log(msg) {
    console.log(msg)
  }
}

const store = Store.create({
  todos: [{title: 'Grab tea'}]
// })
}, { logger })

store.todos[0].setTitle('Grab coffee')
