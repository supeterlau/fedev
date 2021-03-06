module.exports = {
  pages: [
    'pages/book/book',
    'pages/booklist/booklist',
    'pages/explore/explore',
    'pages/settings/settings',
    'pages/index/index',
  ],
  window: {
    navigationBarTitleText: 'Booktracking',
    navigationBarBackgroundColor: '#282c34'
  },
  tabBar: {
    color: "#a9b7b7",
    selectedColor: "#11cd6e",
    borderStyle: "black",
    list: [
      {
        selectedIconPath: "images/icons8-book-50.png",
        iconPath: "images/icons8-book-50.png",
        pagePath: "pages/book/book",
        text: "Book"
      }, {
        selectedIconPath: "images/icons8-list-48.png",
        iconPath: "images/icons8-list-48.png",
        pagePath: "pages/booklist/booklist",
        text: "BookList"
      },{
        selectedIconPath: "images/icons8-compass-48.png",
        iconPath: "images/icons8-compass-48.png",
        pagePath: "pages/explore/explore",
        text: "Explore"
      },{
        selectedIconPath: "images/icons8-settings-50.png",
        iconPath: "images/icons8-settings-50.png",
        pagePath: "pages/settings/settings",
        text: "Settings"
      }
    ]
  }
};
