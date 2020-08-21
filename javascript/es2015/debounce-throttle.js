// https://dev.to/heymarkkop/debounce-x-throttle-23k5

let timeout;

const debounce = (timeout, wait, callback) => {
  if(timeout) clearTimeout(timeout)
  timeout = setTimeout(() => callback(), wait)
}

let isWaiting;

const throttle = (isWaiting, wait, callback) => {
  if(!isWaiting) {
    isWaiting = true 
    callback()
    setTimeout(() => (isWaiting = false), wait)
  }
}