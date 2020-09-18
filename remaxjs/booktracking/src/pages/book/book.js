import * as React from "react";
import { useState } from "react";
import { View, Button, Image } from "remax/wechat";
import styles from "./book.css";
import * as fullText from "../../utils/text";
import classNames from "classnames/bind";

const text = fullText["zh"];
let cx = classNames.bind(styles);

const handleFront = (value, array) => {
  array = array.filter((item) => item != value)
  array.unshift(value)
  return array
}

const makeFront = (value, array) =>
  array.includes(value)
    ? handleFront(value, array)
    : array;

export default () => {
  const [pageId, setPageId] = useState("ToRead");
  const [pageIds, setPageIds] = useState(["ToRead", "Reading", "Read"]);
  const [isShowList, setIsShowList] = useState(false);

  const handleSwtichBtnClick = (btnId) => (e) => {
    console.log(e);
    console.log(btnId);
    if (btnId != pageId) {
      setPageId(btnId);
      let newIds = makeFront(btnId, pageIds)
      console.log(newIds)
      setPageIds(newIds)
    }
    setIsShowList(!isShowList);
  };

  const isShow = (id) => pageId == id;

  return (
    <View className={styles.app}>
      {/* <View className={styles.header}>
        Book Page
      </View> */}
      <View className={styles.nav}>
        <View className={styles.switch}>
          {pageIds.map((id, idx) => (
            <Button
              key={idx}
              className={cx("switchBtn", { active: isShow(id) || isShowList })}
              data-id={id}
              onClick={handleSwtichBtnClick(id)}
            >
              {text[id]}
            </Button>
          ))}
        </View>
        <View className={styles.filter}>
          <Button className={styles.switchBtn}>{text.filter}</Button>
        </View>
      </View>
      <View className={styles.books}></View>
      <Button className={styles.add}>ADD</Button>
    </View>
  );
};
