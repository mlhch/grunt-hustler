// Generated by CoffeeScript 1.3.3
var createFile, from, fs, grunt, id, path, readFile, spec, temp, to, updatePath;

grunt = require('grunt');

fs = require('fs');

path = require('path');

createFile = grunt.file.write;

readFile = grunt.file.read;

temp = './temp/';

id = path.basename(module.id, '.js');

spec = -1;

from = "" + temp + "from/";

to = "" + temp + "to/";

updatePath = function() {
  var base;
  spec += 1;
  base = "" + temp + id + "/spec" + spec + "/";
  from = "" + base + "from/";
  return to = "" + base + "to/";
};

module.exports = {
  setUp: function(callback) {
    updatePath();
    return callback();
  },
  'files': function(test) {
    var aContents, aExpect, bContents, bExpect;
    test.expect(6);
    createFile("" + from + "a.coffee", 'a = 1');
    createFile("" + from + "b.coffee", 'b = 2');
    test.equal(true, fs.existsSync("" + from + "a.coffee", 'should find a.coffee'));
    test.equal(true, fs.existsSync("" + from + "b.coffee", 'should find b.coffee'));
    grunt.helper('hustler copy', {
      data: {
        src: from,
        dest: to
      }
    });
    aExpect = 'a = 1';
    aContents = readFile("" + to + "a.coffee");
    bExpect = 'b = 2';
    bContents = readFile("" + to + "b.coffee");
    test.equal(true, fs.existsSync("" + to + "a.coffee", 'should find a.coffee'));
    test.equal(true, fs.existsSync("" + to + "b.coffee", 'should find b.coffee'));
    test.equal(aExpect, aContents, 'a.coffee contents should be same as original');
    test.equal(bExpect, bContents, 'b.coffee contents should be same as original');
    return test.done();
  },
  'files concatenated': function(test) {
    var contents, dest, expect, src;
    test.expect(5);
    createFile("" + from + "a.coffee", 'a = 1');
    createFile("" + from + "b.coffee", 'b = 2');
    test.equal(true, fs.existsSync("" + from + "a.coffee", 'should find a.coffee'));
    test.equal(true, fs.existsSync("" + from + "b.coffee", 'should find b.coffee'));
    src = ["" + from + "a.coffee", "" + from + "b.coffee"];
    dest = "" + to + "concatenated.coffee";
    grunt.helper('hustler copy', {
      data: {
        src: src,
        dest: dest,
        bare: true
      }
    });
    expect = "a = 1" + grunt.utils.linefeed + "b = 2";
    contents = readFile(dest);
    test.equal(false, fs.existsSync("" + to + "a.coffee", 'should not find a.coffee'));
    test.equal(false, fs.existsSync("" + to + "b.coffee", 'should not find b.coffee'));
    test.equal(expect, contents, 'concatenated.coffee should be concatenated content of a.coffee and b.coffee');
    return test.done();
  },
  'directory to directory': function(test) {
    var aContents, aExpect, bContents, bExpect;
    test.expect(6);
    createFile("" + from + "a.coffee", 'a = 1');
    createFile("" + from + "b.coffee", 'b = 2');
    test.equal(true, fs.existsSync("" + from + "a.coffee", 'should find a.coffee'));
    test.equal(true, fs.existsSync("" + from + "b.coffee", 'should find b.coffee'));
    grunt.helper('hustler copy', {
      data: {
        src: from,
        dest: to
      }
    });
    aExpect = 'a = 1';
    aContents = readFile("" + to + "a.coffee");
    bExpect = 'b = 2';
    bContents = readFile("" + to + "b.coffee");
    test.equal(true, fs.existsSync("" + to + "a.coffee", 'should find a.coffee'));
    test.equal(true, fs.existsSync("" + to + "b.coffee", 'should find b.coffee'));
    test.equal(aExpect, aContents, 'a.coffee contents should be same as original');
    test.equal(bExpect, bContents, 'b.coffee contents should be same as original');
    return test.done();
  }
};
