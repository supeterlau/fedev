import { observable, action, reaction, computed } from 'mobx'

export interface Todo {
  task: string
  isComplete: boolean
}

// interface LabeledValue {
//   label: string;
// }

export class TodoStore {
  @observable todoList: Todo[] = []

  constructor() {
    reaction(
      // new array of incomplete tasks
      () => this.todoList.filter(
        todo => !todo.isComplete
      ),
      incompletedTasks => {
        if (incompletedTasks.length > 5) {
          alert("Dude. You've got too much on your plate.")
        }
      }
    )
  }

  @computed 
  // automatically derived from the state if any of the observable values it uses are changed
  get completedTasks(): number {
    return this.todoList.filter(todo => todo.isComplete).length
  }

  @action 
  // takes in a function and returns a new function with the same signature, but wrapped with mobx magix
  // use action when you create functions that modify your state (not mandatory 但比手动更新 state 性能好)
  // Actions will automatically batch mutations and only trigger computer values and reactions once the outer most action is completed. This will ensure that temporary derived values are hidden from the application until the action has completed.
  addTodo(task: string) {
    this.todoList.push({ task, isComplete: false})
  }

  @action 
  completeTodo(completedTodo: Todo) {
    this.todoList.find(
      todo => todo === completedTodo
    ).isComplete = true
  }
}

export const todoStore = new TodoStore()