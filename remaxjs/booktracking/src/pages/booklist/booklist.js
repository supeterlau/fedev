import * as React from 'react';
import { View, Text, Image } from 'remax/wechat';
import styles from './booklist.css';

export default () => {
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        BookList Page
      </View>
    </View>
  )
}