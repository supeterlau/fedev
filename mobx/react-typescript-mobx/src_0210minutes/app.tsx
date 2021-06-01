import React from 'react'
import { observable, computed, autorun } from 'mobx'
import { observer } from 'mobx-react'

class TodoStore {
  todos = []

  get completeTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length
  }

  report() {
    if (this.todos.length === 0)
      return '<none>'
    const nextTodo = this.todos.find(
      todo => todo.completed === false
    )
    return `Next todo: "${nextTodo ? nextTodo.task : '<none>'}". `+ `Progress: ${this.completeTodosCount}/${this.todos.length}`
  }

  addTodo(task) {
    this.todos.push({
      task,
      completed: false,
      assignee: null,
    })
  }
}

const todoStore = new TodoStore()

todoStore.addTodo('Write Some Elixir')
console.log(todoStore.report())

todoStore.addTodo('Write Some Rust')
console.log(todoStore.report())

todoStore.todos[0].completed = true
console.log(todoStore.report())

todoStore.todos[1].task = 'try Haskell'
console.log(todoStore.report())

todoStore.todos[0].task = 'drop Java'
console.log(todoStore.report())

// each state change, call report 
// To achieve that, the TodoStore has to become observable so that MobX can track all the changes that are being made. Let's alter the class just enough to achieve that. 

// Store 变为 observable 的
// completedTodosCount 为 computed value (derived automatically from the todo list)
// using the @observable and @computed decorators 给对象引入 observable 属性

class ObservableTodoStore {
  @observable todos = []
  @observable pendingRequests = 0

  constructor() {
    autorun(
      () => console.log(this.report)
    )
  }

  @computed get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() {
    if (this.todos.length === 0)
      return '<none>'
    const nextTodo = this.todos.find(todo => todo.completed === false)
    return `Next todo: '${nextTodo ? nextTodo.task : "<none>"}'.` + `Progress: ${this.completedTodosCount}/${this.todos.length}`
  }

  addTodo(task) {
    this.todos.push({
      task,
      completed: false,
      assignee: {
        name: null
      },
    })
  }
}

const observableTodoStore = new ObservableTodoStore()
observableTodoStore.addTodo('Learn Rust')
observableTodoStore.addTodo('Learn Scala')
// 修改了 computed 值， 执行 autorun
observableTodoStore.todos[0].completed = true 
// 修改 observable 值，执行 autorun
observableTodoStore.todos[1].task = 'try erlang'
// 未修改观察中的值，不执行 autorun
observableTodoStore.todos[0].task = 'WTF'

// build a reactive user interface. React 组件默认是不 reactive 的（尽管叫 React）这里，@observer decorator 装饰器解决了这个问题

// MobX will automatically derive and update the relevant parts of the user interface again from the state in the store

// That is enough to make sure that each component individually re-renders when relevant data changes.

// observable objects (both prototyped and plain objects), arrays and primitives

// two independent stores.

// With MobX there is no need to normalize data first and to write selectors to make sure our components will be updated.

// 只要 object 标记为 observable 就能追踪它们. Real JavaScript references will just work.

// input box 
// <input onkeyup="peopleStore[1].name = event.target.value" />

// Asynchronous actions

// everything in our small Todo application is derived from the state, it really doesn't matter when state is changed

// But please note that MobX is just a library to solve a technical problem and not an architecture or even state container in itself. In that sense the above examples are contrived and it is recommended to use proper engineering practices like encapsulating logic in methods, organize them in stores or controllers etc.

// NEXT https://mobx-state-tree.js.org/intro/philosophy


var peopleStore = observable([
  { name: 'Larry' },
  { name: 'Joe' }
])

observableTodoStore.todos[0].assignee = peopleStore[0]
observableTodoStore.todos[1].assignee = peopleStore[1]
peopleStore[0].name = 'Michel'

interface TodoListProps {
  store?: ObservableTodoStore
}

interface Assignee { 
  name: string
}

interface Todo {
  task: string
  completed: boolean
  assignee: Assignee
}

interface TodoViewrops {
  todo: Todo
}

class RenderCounter extends React.Component {
  count = (n => () => <div>{n++}</div>)(1)
  render() {
    return (
      <div>{this.count()}</div>
    )
  }
}

@observer
class TodoView extends React.Component<TodoViewrops> {

  render() {
    // const RenderCounter = () => (
    //   n => <div>{n++}</div>
    // )(renderCount)
    const todo = this.props.todo
    return (
      <li onDoubleClick={this.onRename}>
        <input 
          type='checkbox'
          checked={todo.completed}
          onChange={this.onToggleCompleted}
        />
        {todo.task}&nbsp;
        {todo.assignee
          ? <small>{todo.assignee.name}</small>
          : null
        }
        <RenderCounter />
      </li>
    )
  }

  onToggleCompleted = () => {
    const todo = this.props.todo
    todo.completed = !todo.completed
  }

  onRename = () => {
    const todo = this.props.todo
    todo.task = prompt('Task name', todo.task) || todo.task
  }
}

@observer
class TodoList extends React.Component<TodoListProps> {

  load(store, number) {
    store.pendingRequests++;
    setTimeout(function () {
      Array(number).fill(0).forEach(
        item => store.addTodo('Random Todo ' + Math.random())
      )
      
      store.pendingRequests--;
    }, 2000);
  }

  render() {
    // const RenderCounter = () => (
    //   n => <div>{n++}</div>
    // )(renderCount)
    const store = this.props.store
    return (
      <div>
        Your name:
        <input onKeyUp={({
          currentTarget: { value }
        }: React.SyntheticEvent<HTMLInputElement>) => {
          peopleStore[1].name = value
        }} />
        <p><button onClick={()=>this.load(store, 5)}>LOAD</button></p>
        <p>{store.report}</p>
        <ul>
          {store.todos.map(
            (todo, idx) => <TodoView todo={todo} key={idx} />
          )}
          {store.pendingRequests > 0
            ? <span>Loading ...</span>
            : null
          }
          <button onClick={this.onNewTodo}>New Todo</button>
          <small>(double-click a todo to edit)</small>
          <RenderCounter />
        </ul>
      </div>
    )
  }

  onNewTodo = () => {
    this.props.store.addTodo(
      prompt('Enter a new todo', 'Learn mobx')
    )
  }
}



export class App extends React.Component {
  render() {

    return (
      // <div>
      //   BOOOM
      // </div>
      <TodoList store={ observableTodoStore } />
    )
  }
}