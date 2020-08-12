import * as React from 'react';
import { View, Button, Image } from 'remax/wechat';
import styles from './book.css';

export default () => {
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        Book Page
      </View>
      <Button className={styles.add}>ADD</Button>
    </View>
  )
}