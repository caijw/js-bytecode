const minimist = require('minimist')
const fs = require('fs')
const path = require('path')
const assert = require('assert/strict')

const argv = minimist(process.argv.slice(2))
const inFile = argv.in
const outFile = argv.out
const sourceFile = path.parse(argv.source)


const inContent = fs.readFileSync(inFile).toString()
const sourceContent = fs.readFileSync(argv.source).toString()

const reg = /(evalmachine\.<anonymous>):(\d+):(\d+)/g
const regLine = /(evalmachine\.<anonymous>):1\n/g
let lastLine = -1

function getRealPosition(line, column) {
    assert.equal(line, 1)
    let currentLineStart = 0
    let realLine = 1
    for (let i = 0; i < column; ++i) {
        if (sourceContent[i] === '\n') {
            realLine++;
            currentLineStart = i
        }
    }
    return {
        line: realLine,
        column: column - currentLineStart - 1
    }
}

var outContent = inContent.replace(reg, (match, p1, p2, p3, offset, string) => {
    const line = parseInt(p2, 10)
    const column = parseInt(p3, 10)
    const realPostion = getRealPosition(line, column)
    if (lastLine === -1) {
        lastLine = realPostion.line
    }
    return `${sourceFile.name + sourceFile.ext}:${realPostion.line}:${realPostion.column}`
})

outContent = outContent.replace(regLine, (match, p1, p2, offset, string) => {
    return `${sourceFile.name + sourceFile.ext}:${lastLine}\n`
})

console.log(inContent)

if (outFile) {
    fs.writeFileSync(outFile, outContent)
} else {
    console.log(outContent)
}



