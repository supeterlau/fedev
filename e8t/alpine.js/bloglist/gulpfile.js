const { src, dest, watch, task } = require('gulp') 

const bro = require('gulp-bro')

const browserSync = require('browser-sync')

// build

const _build = () => {
  // commonJS module, browserify and put in dist
  src('./src/js/*.js')
    .pipe(bro())
    .pipe(dest('./dist'))
  
  // JS script, put in dist
  // src('./src/js/**/*.js')
  //   .pipe(dest('./dist'))
  console.log('build HTML')
  // HTML CSS, put in dist
  src(['./src/**/*.html', './src/**/*.css'])
    .pipe(dest('./dist'))
}

const _watch = () => {
  watch([
    'src/**/*.js',
    'src/**/*.html'
  ]).on('change', _build)
  watch([
    'src/**/*.js',
    'src/**/*.html'
  ]).on('change', browserSync.reload)
}

const _serve = () => {
  _build()
  browserSync.init({
    server: './dist',
    open: false,
  })

  _watch()
}

task('serve', _serve)