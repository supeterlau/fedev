import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  Swiper,
  SwiperItem,
  Icon,
  Camera,
  navigateTo,
} from 'remax/wechat';
import styles from './index.module.css';

export default () => {
  const handleAdd = () => {
    navigateTo({ url: '../scanCode/index' });
  };

  return (
    <View className={styles['whole']}>
      {/* <Text className={`${styles["icon-open-new"]} ${styles["icon-open-new"]}`}></Text>
      <Text className={styles["svg-demo-text"]}>在新窗口打开</Text> */}
      {/* <Icon className={"iconfont icon-add"}></Icon> */}
      <View className={styles.bookAdd} onClick={handleAdd}></View>
    </View>
  )
}