/*
const user = {
  info,
  followee, // 我关注的
  follower, // 关注我的
  favorite: {
    comment: [],
    booklist: [],
  }
}

const book = {}

const booklist =  {
  description: '',
  list: [book],
}
*/

const newBook = (prefix, idx) => ({
  id: `${idx}-${prefix}`,
  title: `book-${idx}-${prefix}`,
  author: `author-${idx}-${prefix}`,
  isbn: `111222333-${prefix.length}-${idx}`,
  pageNumber: 300,
  publishedAt: `2019-10-10-${idx}`,
  progress: 0,  // 0-100
});

const books = (prefix, count) => {
  Array(count)
    .fill(0)
    .map((_, idx) => newBook(prefix, idx));
};

const newBookList = (prefix, idx) => ({
  id: `${idx}-${prefix}`,
  description: `best list of ${idx} ${prefix}`,
  books: books(prefix, 10),
});

const initialState = {
  entities: [],

  user: {},
  books: {
    toRead: books[("to_read", 10)],
    reading: books[("reading", 10)],
    read: books[("read", 10)],
  },
  bookList: {
    own: newBookList("own", 5),
    favorite: newBookList("favorite", 10),
  },
};

export default initialState;
