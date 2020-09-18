import * as React from 'react';
import './app.css';

/*

bt {
  toRead: [{
    id: '',
    info: '',
    comments: [
      {
        id: "",
        content: "",
        res: [
          {
            type: 'image",
            url: ''
          }
        ]
      }
    ]
  }],
  reading: [{
  
  }],
  done: [{
  
  }],
  scanCode: "",
  userInfo: {}
}
**/
export const BookTrackingContext = React.createContext({});

const App = ({ children }) => {
  const [items, setItems] = React.useState([
    { id: 1, text: 'Learning Javascript', completed: true },
    { id: 2, text: 'Learning ES2016', completed: true },
    { id: 3, text: 'Learning Remax', completed: false },
  ]);

  return (
    <BookTrackingContext.Provider
      value={{
        items,
        setItems,
      }}
    >
      {children}
    </BookTrackingContext.Provider>
  );
};

export default App;
