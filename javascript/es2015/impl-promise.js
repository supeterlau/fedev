let PENDING = 0
let FULFILLED = 1
let REJECTED = 2

// Helper

const getThen = value => {
  let t = typeof value 
  if(value && (t === 'object' || t === 'function')) {
    let then = value.then 
    if (typeof then === 'function') {
      return then 
    }
  }
  return null 
}

// resolver 函数，确保 onFulfilled onRejected 都最多执行一次

const doResolve = (fn, onFulfilled, onRejected) => {
  let done = false
  try {
    fn(

      value => {
        if(done) return
        done = true 
        onFulfilled(value)
      },

      reason => {
        if(done) return 
        done = true 
        onRejected(reason)
      }

    )
  } catch (err) {
    if (done) return 
    done = true 
    onRejected(err)
  }
}

const Promise = function (fn) {

  let state = PENDING

  let value = null 

  let handlers = []

  let handle = handler => {
    if (state === PENDING) {
      handlers.push(handler)
    } else {
      if (state === FULFILLED &&
        typeof handler.onFulfilled === 'function') {
          handler.onFulfilled(value)
        }
      if (state === REJECTED &&
        typeof handler.onRejected === 'function') {
          handler.onRejected(value)
        }
    }
  }

  let fulfill = result => {
    state = FULFILLED
    value = result

    // 实现 .done 
    handlers.forEach(handle)
    handlers = null 
  }

  let reject = error => {
    state = REJECTED
    value = error 

    // 实现 .done 
    handlers.forEach(handle)
    handlers = null 
  }

  let resolve = (result) => {
    try {
      let then = getThen(result)
      if (then) {
        doResolve(then.bind(result), resolve, reject)
        return 
      }
      fulfill(result)
    } catch (e) {
      reject(e)
    }
  }

  this.done = (onFulfilled, onRejected) => {
    // setTimeout 用于保持 asynchronous
    setTimeout(() => {
      handle({
        onRejected,
        onFulfilled
      })
    }, 0)
  }

  this.then = function (onFulfilled, onRejected) {
    let self = this 
    return new Promise((resolve, reject) => {
      return self.done(
        result => {
          if(typeof onFulfilled === 'function') {
            try {
              return resolve(onFulfilled(result))
            } catch (error) {
              return reject(error)
            }
          }
        },
        error => {
          if(typeof onRejected === 'function') {
            try {
              return resolve(onRejected(error))
            } catch (error) {
              return reject(error)
            }
          } else {
            return reject(error)
          }
        }
      )
    })
  }

  // 开始 resolve promise
  doResolve(fn, resolve, reject)
}

