import * as React from 'react';
import { Button } from 'remax/wechat';

const style = {
  width: '10px'
}
export default (props) => <Button style={style}>{props.children} </Button>