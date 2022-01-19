const { walker } = require('little-byte').default;
const path = require('path');
const config = require('./bytecode.config')

walker.start({
  inputDir: path.join(__dirname, config.inputDir),
  outputDir: path.join(__dirname, config.outputDir),
  onFile(fileInfo, defaultAction) {
      if ( config.fileNames.indexOf(fileInfo.name) !== -1 ) {
        return 'compile'
      }
      return 'copy'
  }
});