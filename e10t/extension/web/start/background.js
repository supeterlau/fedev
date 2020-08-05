// listening event for runtime.onInstalled

// const { storeTabs } = require('./libs/storeTabs')

const STORE_TABS = 'store-tabs'
const STORE_TAB = 'store-tab'

chrome.runtime.onInstalled.addListener(function () {

  // 需要 storage 权限
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green.");
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        // pageUrl: { hostEquals: '*' }
        pageUrl: { urlMatches: '.*' }
      })
    ],
    actions: [
      new chrome.declarativeContent.ShowPageAction()
    ]
  }])
})

chrome.commands.onCommand.addListener(async function (command) {
  console.log('Command:', command)
  let data;
  switch (command) {
    case STORE_TABS:
      data = await storeTabs()
      sendToPage('copy', data)
      // sendToPage('copy', 'from background')
      break;
    case STORE_TAB:
      data = await storeTab()
      sendToPage('copy', data)
    default:
      break;
  }
})

const sendToPage = (type, data) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: "hello",
      type,
      data,
    }, async function (response) {
      console.log(response);
      if(response.type == 'copyOk') {
        
        if(tabs.length > 1)
          // delete tabs
          await deleteTabs()
        else
          console.log(tabs)
      }
    });
  });
}

chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    // if (request.greeting == "hello")
    //   sendResponse({ farewell: "goodbye" });
    
  });