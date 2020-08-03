/*

sed

nodejs
  
  stream

*/
const path = require('path')
const fs = require('fs');
const fsPromises = fs.promises;
const readline = require('readline')
const process = require('process')

const move = fsPromises.rename

const bump = (version, chan = 'minor') => {
  const RE_VESION = /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/
  return version.replace(
    RE_VESION,
    (match, p1, p2, p3, offset, string, groups) => {
      // console.log(groups)
      let { major, minor, patch } = groups
      console.log(major, minor, patch)
      // bump major
      switch (chan) {
        case 'major':
          major = (+major) + 1;
          minor = 0
          patch = 0
          break;
        case 'minor':
          minor = (+minor) + 1;
          patch = 0
          break;
        default:
          patch = (+patch) + 1;
          break;
      }
      return [major, minor, patch].join('.')
    }
  )
}

const handler = async (src, chan = 'minor') => {
  try {
    let dest = `${src}-bump`
    const writeStream = fs.createWriteStream(dest)

    const readStream = fs.createReadStream(src)

    const rl = readline.createInterface({
      input: readStream,
      // use the crlfDelay option to recognize all instances of CR LF ('\r\n') in input.txt as a single line break.
      crlfDelay: Infinity
    })

    // for await (const [num, line] of rl.entries()) {
    for await (let line of rl) {
      // console.log(line)
      if (line.trim().startsWith('"version"')) {
        console.log(line)
        line = bump(line, chan)
        console.log(line)
      }
      writeStream.write(line + '\n')
    }

    writeStream.on('finish', async () => {
      console.log('All writes are now complete.');
      await fsPromises.rename(dest, src)
    });
    writeStream.end('This is the end\n');
  } catch (error) {
    // console.error(error)
    throw error
  }
}

const cli = async () => {
  let chans = ['major', 'minor', 'patch']
  try {
    let [,, src, chan] = process.argv || []
    if(src === undefined) {
      throw new Error('Please input target dir')
    }
    chan = chan || 'minor'
    FILE_NAME = 'package.json'
    src = path.join(src, FILE_NAME)
    let targetStat = await fsPromises.stat(src)
    if (targetStat.isFile()) {
      if(chans.includes(chan.trim())) {
        handler(src, chan)
      } else if (chan === 'redo') {
        // .bump-action "major -1" "patch +1"
        // git checkout
        console.log('git checkout <YOUR_FILE_PATH>')
      } else {
        console.log(`Please input valid channel type: ${chans}`)
      }
    }
  } catch (error) {
    throw error
  }
}

// process('./demo').catch(console.error)

cli().catch(console.error)


// redo bump
// open package.json