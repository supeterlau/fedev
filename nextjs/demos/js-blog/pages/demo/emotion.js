// this comment tells babel 
// to convert jsx to calls to a function 
// called jsx instead of React.createElement
// https://emotion.sh/docs/introduction

/** @jsx jsx */
import Layout from '../../components/layout'
import Head from 'next/head'
import { jsx, Global, ClassNames } from '@emotion/core'
import tw, { css } from 'twin.macro';
// import {css as eCss} from 'emotion';

const button0 = css`
    ${tw`rounded text-white bg-blue-200`};
`;

const yellow = css`
  color: yellow;
`
let NewButton = props => {
  let {className, ...rest} = props
  return (
    // <button
    //   className={eCss`
    //     color: darkgray;
    //   `}
    //   {...props}
    //   >
  
    // </button>
    <ClassNames>
      {({ css, cx }) => (
        <button
          // className={cx(
          //   className,
          //   css`
          //     color: yellow;
          //   `
          // )}
          className={`${
            css`
            color: yellow;
            `
          } ${className}`}
          {...rest}
        ></button>
      )}
    </ClassNames>
  )
}

export default function Demo() {
  let title = 'emotion demo'
  let color = 'white'
  return <Layout>
    {/* <Head>
      <title>{title}</title>
    </Head> */}
    <div
      css={css`
      
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    &:hover {
      color: ${color};
    }
    `}
    >
      Hover to change color.
  </div>
    <div>
      <button
        css={css`
        padding: 10px;
        border-radius: 5px;
        background-color: blue;
        color: white;
      `}>Hover: change color</button>
    </div>
    <p>Tailwind CSS</p>
    <div>
      <button css={button0}>A Button</button>
    </div>

    <p>Bulma CSS</p>

    <div className="buttons">
      <button

        {...{ className: "button is-primary" }}

      >Primary</button>
      <button className="button is-link">Link</button>

      {/* <newButton className="button is-primary">Have Fine</newButton> */}
      <button className={`button is-primary`} css={yellow} >Hello Emotion</button>
    </div>
  </Layout>
}
