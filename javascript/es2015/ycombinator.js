const fact = (n) => {
  if (n < 2) return 1;
  else return n * fact(n - 1);
};

// console.log(fact(10))

const makeFact = (otherFact) => {
  const fact = (n) => {
    // n < 2 时不需要 otherFact
    if (n < 2) return 1;
    else return n * otherFact(n - 1);
  };
  return fact;
};

// 令 otherFact = fact

const makeRealFact = (makeFact) => {
  // const tryFact = n => {
  //   // const nextTryFact 还有声明
  //   const nextTryFact = makeFact(tryFact)
  //   return nextTryFact(n)
  // }
  // return makeFact(tryFact)

  // const getNextTryFact = () => {
  //   const tryFact = n => {
  //     const nextTryFact = getNextTryFact()
  //     return nextTryFact(n)
  //   }
  //   return makeFact(tryFact)
  // }
  // return getNextTryFact()

  // 解决声明 getNextTryFact 问题 将自己的引用作为参数传入
  // const getNextTryFact = (getNextTryFactRef) => {
  //   const tryFact = n => {
  //     const nextTryFact = getNextTryFactRef(getNextTryFactRef)
  //     return nextTryFact(n)
  //   }
  //   return makeFact(tryFact)
  // }
  // return getNextTryFact(getNextTryFact)

  // 消除声明语句
  // const getNextTryFact = (getNextTryFactRef) => {
  //   const nextTryFact = makeFact(n => {
  //     // const nextTryFact = getNextTryFactRef(getNextTryFactRef)
  //     // return nextTryFact(n)

  //     const result = getNextTryFactRef(getNextTryFactRef)(n)
  //     return result
  //   })
  //   return nextTryFact
  // }
  // return getNextTryFact(getNextTryFact)

  // 合并 return
  // const getNextTryFact = (getNextTryFactRef) => {
  //   return makeFact(n => {
  //     return getNextTryFactRef(getNextTryFactRef)(n)
  //   })
  // }
  // // getNextTryFact(getNextTryFact) =>
  // // ((ref) => {
  // //   return ref(ref)
  // // })(getNextTryFact)
  // return getNextTryFact(getNextTryFact)

  // 替换 getNextTryFact
  return ((ref) => {
    return ref(ref);
  })((getNextTryFactRef) => {
    return makeFact((n) => {
      return getNextTryFactRef(getNextTryFactRef)(n);
    });
  });
};

const makeRealFactClean = (makeFact) => {
  return ((ref) => {
    return ref(ref);
  })((getNextTryFactRef) => {
    return makeFact((n) => {
      return getNextTryFactRef(getNextTryFactRef)(n);
    });
  });
};

// makeRealFactClean => y
// makeFact => le
// n => x
// makeRealFact => y
// getNextTryFactRef => f

const y = (le) => {
  return ((f) => {
    return f(f);
  })((f) => {
    return le((x) => {
      return f(f)(x);
    });
  });
};

// let result = makeRealFact(makeFact)(10);

let result = y(makeFact)(5);
console.log(result);
