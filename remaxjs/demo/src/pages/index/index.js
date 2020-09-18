import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Swiper,
  SwiperItem,
} from 'remax/wechat';
import constate from "constate";

import styles from './index.module.css';


// 1️⃣ Create a custom hook as usual
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prevCount => prevCount + 1);
  return { count, increment };
}

// 2️⃣ Wrap your hook with the constate factory
const [CounterProvider, useCounterContext] = constate(useCounter);

function AddButton() {
  // 3️⃣ Use context instead of custom hook
  const { increment } = useCounterContext();
  return <Button onClick={increment}>+</Button>;
}

function Count() {
  // 4️⃣ Use context in other components
  const { count } = useCounterContext();
  return <Text>{count}</Text>;
}

function App() {
  // 5️⃣ Wrap your components with Provider
  return (
    <CounterProvider>
      <Count />
      <Button />
    </CounterProvider>
  );
}

export default () => {
  return (
    <View className={styles.app}>
      {/* <View className={styles.header}>
        Header
        <View className={styles.text}>
          <CounterProvider>
            <Count />
            <AddButton />
          </CounterProvider>
        </View>
      </View> */}
      <Swiper>
        <SwiperItem>To Read / 想读</SwiperItem>
        <SwiperItem>Reading / 在读</SwiperItem>
        <SwiperItem>Read History / 已读</SwiperItem>
      </Swiper>
    </View>
  );
};
