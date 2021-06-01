import React from 'react'
import { observable, computed, autorun } from 'mobx'
import { observer } from 'mobx-react'



export class App extends React.Component {
  render() {

    return (
      <div>
        BOOOM
      </div>
      // <TodoList store={ observableTodoStore } />
    )
  }
}