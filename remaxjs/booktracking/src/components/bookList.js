import * as React from "react";
// import { useState } from "react";
import { View, Button, Image } from "remax/wechat";

const Book = ({book}=props) => 
  <View>
    <Image></Image>
  </View>

const BookList = ({books}=props) => {
  console.log(props)

  return <View>
    {
      books.map((book, idx) => 
        <Book 
          key={idx}
          book={book}
        />
      )
    }
  </View>
}

export default BookList;