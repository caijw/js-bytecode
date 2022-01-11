const bytenode = require('bytenode');
let compiledFilename = bytenode.compileFile({
  filename: './code.js',
  output: './code.jsc'
});

compiledFilename.then((output) => {
  console.log(`${output} ok`)
}).catch((err) => {
  console.error(err)
})