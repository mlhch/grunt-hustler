// Generated by CoffeeScript 1.3.3
/*global module, require
*/

module.exports = function(grunt) {
  var path;
  path = require('path');
  grunt.registerHelper('hustler normalizeFiles', function(config) {
    var data, dest, destExt, files, groups, isDestADirectory, isSrcAnArray, key, src, value;
    data = config.data;
    dest = data.dest;
    src = data.src;
    files = data.files;
    groups = {};
    if (dest && src) {
      dest = path.relative('./', dest);
      isSrcAnArray = Array.isArray(src);
      if (!isSrcAnArray) {
        src = [src];
      }
      destExt = path.extname(dest);
      isDestADirectory = destExt.length === 0;
      src.forEach(function(source) {
        var sourceFiles;
        sourceFiles = grunt.file.expandFiles(source);
        return sourceFiles.forEach(function(sourceFile) {
          var absoluteDestination, destination, relative, sourceDirectory;
          if (isDestADirectory) {
            sourceDirectory = path.dirname(source.replace('**', ''));
            relative = path.relative(sourceDirectory, sourceFile);
            absoluteDestination = path.resolve(dest, relative);
            destination = path.relative('./', absoluteDestination);
          } else {
            destination = dest;
          }
          if (!groups[destination]) {
            groups[destination] = [];
          }
          return groups[destination].push(sourceFile);
        });
      });
    }
    if (files) {
      for (key in files) {
        value = files[key];
        console.log('dest, src', key, value);
      }
    }
    return groups;
  });
  return grunt.registerMultiTask('norm', 'Normalize Files', function() {
    var options;
    options = grunt.helper('hustler normalizeFiles', this);
    return console.log(options);
  });
};
