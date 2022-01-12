const minimist = require('minimist')
const fs = require('fs')
const path = require('path')

const argv = minimist(process.argv.slice(2))
const logFile = argv.log
const outFile = argv.out
const sourceFile = path.parse(argv.source)

console.log(`sourceFile:`, sourceFile)

const logContext = fs.readFileSync(logFile).toString()

const reg = /(evalmachine\.<anonymous>):(\d+):(\d+)/g

var outLogContent = logContext.replace(reg, (match, p1, p2, p3, offset, string) => {
    return `${sourceFile.name + sourceFile.ext}:${p2}:${p3}`
})


console.log('out:\n', outLogContent)
