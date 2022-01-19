const bytecode = require("little-byte")
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
require(`${argv.entry}.bytecode`)
// require('./dist/test.bytecode')

setInterval(() => {

}, 2000)