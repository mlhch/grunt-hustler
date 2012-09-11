/*global module, require
*/

module.exports = function(grunt) {
  var Beautifier, fs, path, removeNonPrintableCharacters;
  Beautifier = require('node-js-beautify');
  fs = require('fs');
  path = require('path');
  removeNonPrintableCharacters = function(content) {
    var pattern;
    pattern = /(\t|\r\n|\n|\r)/gm;
    return content.replace(pattern, '');
  };
  return grunt.registerMultiTask('template', 'Compiles a template', function() {
    var beautifier, config, dest, ext, files, minify, src, srcDir, _ref, _ref1;
    src = this.file.src;
    dest = this.file.dest;
    files = grunt.file.expandFiles(src);
    srcDir = path.dirname(src.replace('**', ''));
    config = this.data;
    ext = (_ref = config.ext) != null ? _ref : '.html';
    minify = (_ref1 = config.minify) != null ? _ref1 : false;
    beautifier = new Beautifier();
    config.include = grunt.file.read;
    return files.forEach(function(file) {
      var compiled, destPath, fileExt, relative, source;
      source = grunt.file.read(file);
      fileExt = path.extname(file);
      relative = path.relative(srcDir, file);
      destPath = path.resolve(dest, relative).replace(fileExt, ext);
      compiled = grunt.template.process(source, {
        config: config
      });
      if (minify) {
        compiled = removeNonPrintableCharacters(compiled);
      } else {
        compiled = beautifier.beautify_html(compiled, config);
      }
      return grunt.file.write(destPath, compiled);
    });
  });
};