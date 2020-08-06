// postcss.config.js

// const tailwind = require('tailwindcss')
// const autoprefixer = require('autoprefixer')
// const cssnano = require('cssnano')
//
// const plugins = process.env.NODE_ENV === 'production'
//   ? [tailwind, autoprefixer, cssnano]
//   : [tailwind, autoprefixer]
//
// module.exports = { plugins }

const production = !process.env.ROLLUP_WATCH;
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("postcss-import")(),
    require("tailwindcss"),
    require("autoprefixer"),
    // purge css in production
    production &&
    purgecss({
      content: ["./**/*.html", "./**/*.svelte"],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
  ]
}
