替代页面 每个插件可以替代一个

  http://open.chrome.360.cn/extension_dev/override.html

  chrome://bookmarks
  chrome://history
  chrome://newtab

  替代 chrome://newtab

  "chrome_url_overrides" : {
    "newtab": "start.html"
  },

copy all unpinned tabs url and name


- get all 
  tabs
  bookmarks
  history
- config keyshort
- store opened unpinned tab info and prompt to close all


- qrcode 

    <script src="https://cdn.bootcdn.net/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

extension store 

search bar
  google
  bing
  baidu
  duckduckgo
  github
  zhihu

online tools
  qrcode

bookmark

history

sync config

hot rank

backup: zhihu weibo douban

play music

###

make all api promised

###

引入外部依赖
  
  https://developer.chrome.com/extensions/contentSecurityPolicy

contentScript

  Content scripts是在Web页面内运行的javascript脚本。通过使用标准的DOM，它们可以获取浏览器所访问页面的详细信息，并可以修改这些信息。

  不能使用除了chrome.extension之外的chrome.* 的接口
  不能访问它所在扩展中定义的函数和变量
  不能访问web页面或其它content script中定义的函数和变量
  不能做cross-site XMLHttpRequests

桌面通知 http://open.chrome.360.cn/extension_dev/notifications.html

  生辰

标签 http://open.chrome.360.cn/extension_dev/tabs.html

  create 和 update 不需要"标签"权限

书签 http://open.chrome.360.cn/extension_dev/bookmarks.html

"permissions": [
  "bookmarks"
],

历史记录 http://open.chrome.360.cn/extension_dev/history.html

"permissions": [
  "history"
],

background html
"background": {
    "page": "background.html"
  },

  "scripts": ["background.js"],

  page scripts 无法同时使用

clipboard
  This API is experimental. It is only available to Chrome users on the dev channel.
  https://developer.chrome.com/apps/clipboard

  hack:
    https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    https://ourcodeworld.com/articles/read/143/how-to-copy-text-to-clipboard-with-javascript-easily
    clipboard.js

tcp server

include scripts from a Chrome extension
https://stackoverflow.com/questions/9057292/requirejs-in-a-chrome-extension

https://github.com/otiai10/chrome-extension-es6-import/


Deps
zepto
https://github.com/davidshimjs/qrcodejs