const makeItem = () => {
  let n = 0
  return {
    next: () => {
      n+=1
      console.log(n)
    }
  }
  /*
  return () => {
    n+=1
    console.log(n)
  }
  */
}

let maker = makeItem()
maker.next()
maker.next()
maker.next()
