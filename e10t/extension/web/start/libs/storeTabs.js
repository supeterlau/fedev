// [32,421,345,645,324,7,5,4].reduce((acc, next) => next+acc, 1)
// pipe(10, add13, add17)
const pipe = (data, ...funcs) => funcs.reduce(
  (acc, func) => func instanceof Function ? func(acc) : acc,
  data
)

const sum = numbers => numbers.reduce((acc, cur) => acc + cur, 0)

const countTree = tree => {
  // console.log(tree)
  // console.log(tree.children)
  let result = tree.children instanceof Array ? sum(tree.children.map(countTree)) : 1
  // console.log(result);
  return result

}

// file:///User 
const isUrl = string => ['http://', 'https://', 'file://'].some(
  prefix => string.startsWith(prefix)
)

// https://techliance.com/blog/reactjs-vs-vuejs/#:~:text=React.js%20uses%20virtual%20DOM%20to%20make%20a%20virtual,used%20for%20developing%20interactive%20web%20and%20mobile%20applications.

const extractGoogleSearch = url => {
  let index = url.indexOf('#:~:text=')
  if (index === -1)
    return url
  else
    return url.slice(0, index + 1)
}

const extractUrl = url => pipe(url, extractGoogleSearch)

chrome.tabs.queryAsync = queryInfo => new Promise(
  (resolve, reject) => {
    chrome.tabs.query(
      queryInfo,
      tabs => resolve(tabs)
    )
  }
)

const setTimeoutAsync = (func, timeout) => new Promise(
  resolve => setTimeout(() => resolve(func), timeout)
)

chrome.tabs.removeAsync = (tabIds, count=0, gap=0) => new Promise(
  async (resolve) => {
    if(tabIds instanceof Array) {
      while(tabIds.length > 0) {
        let outTabs = tabIds.splice(0, count)
        console.log(outTabs)
        await setTimeoutAsync(
          chrome.tabs.remove(
            outTabs,
            () => resolve()
          ),
          gap
        )
      }
    } else {
      chrome.tabs.remove(
        tabIds,
        () => resolve()
      )
    }
  }
)

const getTabs = async () => {
  let result = []
  try {
    let tabs = await chrome.tabs.queryAsync({
      // active: true, 
      pinned: false,  // 未 pin
      currentWindow: true,  // 当前窗口
    })
    console.log(tabs.length);
    let result = tabs
      .filter(tab => isUrl(tab.url))
      .map(
        tab => `${extractUrl(tab.url)} ${tab.title}`
      ).join('\n')
    // console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
  return result
}

const deleteTabs = async () => {
  try {
    let tabs = await chrome.tabs.queryAsync({
      // active: true, 
      pinned: false,  // 未 pin
      currentWindow: true,  // 当前窗口
    })
    let tabIds = tabs.filter(tab => isUrl(tab.url)).map(tab => tab.id)
    await chrome.tabs.removeAsync(tabIds, 5, 500)
  } catch (error) {
    console.error(error)
  }
}

const now = () => (new Date()).getTime()

const ndays = (n = 1) => n * 24 * 3600 * 1000

const getHistory = () => {
  let endTime = now()
  let startTime = now() - ndays()
  chrome.history.search({
    text: '',
    startTime,
    endTime,
    // maxResults
  }, function (links) {
    console.log(links)
  })
}

const getBookmark = () => {
  chrome.bookmarks.getTree(function (tree) {
    console.log(tree)
    console.log(countTree(tree[0]))
  })
}

const storeTabs = async () => {
  let tabs = await getTabs()
  // console.log(tabs)
  return tabs
  // getHistory()
  // getBookmark()
  // Send Message
}

// module.exports = {
//   storeTabs
// }