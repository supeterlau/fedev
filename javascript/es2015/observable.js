class Observable {
  constructor (func) {
    this._func = func
  }

  subscribe(observer) {
    return this._func(observer)
  }
}

let workObservable = new Observable(observer => {
  setTimeout(() => {
    observer.next('got data!')
    observer.complete()
  }, 1000)
})

let workObserver = {
  next(data) {
    console.log(data)
  },
  error(e) {
    console.error(e)
  },
  complete() {
    console.log('request complete')
  }
}

workObservable.subscribe(workObserver)
