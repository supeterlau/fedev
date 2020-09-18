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
  navigateBack,
} from 'remax/wechat';
import styles from './index.module.css';

// click Add(scan btn) -> new Page scan -> scan done -> go back

function error(e) {
  console.log(e.detail)
}

export default () => {
  const [photo, setPhoto] = React.useState('');

  const takePhoto = () => {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        // this.setData({
        //   src: res.tempImagePath
        // })
        console.log(res.tempImagePath)
        setPhoto(res.tempImagePath)
      }
    })
  }

  const handleScanDone = (e) => {
    console.log("Done Scan: ", e.detail)
    console.log("Go back")
    navigateBack()
  }

  return (
    <View className={styles['whole']}>
      <Camera
        devicePosition={"back"}
        flash={"off"}
        onError={error}
        mode={'scanCode'}
        onScanCode={handleScanDone}
        style={
          { width: "100%", height: "300px" }
        }></Camera>
      {
        photo !== '' ?
          <Image src={photo}></Image> :
          <View>Waiting for shot</View>
      }

      {/* <Text className={`${styles["icon-open-new"]} ${styles["icon-open-new"]}`}></Text>
      <Text className={styles["svg-demo-text"]}>在新窗口打开</Text> */}
      {/* <Icon className={"iconfont icon-add"}></Icon> */}
      {/* <View className={styles.bookAdd} onClick={takePhoto}></View> */}
    </View>
  )
}