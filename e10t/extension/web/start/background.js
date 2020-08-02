// listening event for runtime.onInstalled

// const { storeTabs } = require('./libs/storeTabs')

const STORE_TABS = 'store-tabs'

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
  switch (command) {
    case STORE_TABS:
      let data = await storeTabs()
      sendToPage('copy', data)
      // sendToPage('copy', 'from background')
      break;
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
        // delete tabs
        await deleteTabs()
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