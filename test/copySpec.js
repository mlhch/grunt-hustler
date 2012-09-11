// Generated by CoffeeScript 1.3.3
var createFile, deleteDirectory, from, fs, grunt, rimraf, temp, to;

grunt = require('grunt');

rimraf = require('rimraf');

fs = require('fs');

createFile = grunt.file.write;

deleteDirectory = rimraf.sync;

temp = './temp/';

from = "" + temp + "from/";

to = "" + temp + "to/";

exports['directory to directory'] = {
  setUp: function(callback) {
    deleteDirectory(temp);
    createFile("" + from + "a.js", '');
    createFile("" + from + "b.js", '');
    return callback();
  },
  tearDown: function(callback) {
    deleteDirectory(temp);
    return callback();
  },
  main: function(test) {
    test.expect(4);
    test.equal(true, fs.existsSync("" + from + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + from + "b.js", 'should find b.js'));
    grunt.helper('hustler copy', from, to);
    test.equal(true, fs.existsSync("" + to + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + to + "b.js", 'should find b.js'));
    return test.done();
  }
};

exports['array of directories to directory'] = {
  setUp: function(callback) {
    deleteDirectory(temp);
    createFile("" + from + "a/a.js", '');
    createFile("" + from + "b/b.js", '');
    createFile("" + from + "c/d/d.js", '');
    return callback();
  },
  tearDown: function(callback) {
    deleteDirectory(temp);
    return callback();
  },
  main: function(test) {
    var src;
    test.expect(6);
    test.equal(true, fs.existsSync("" + from + "a/a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + from + "b/b.js", 'should find b.js'));
    test.equal(true, fs.existsSync("" + from + "c/d/d.js", 'should find d.js inside d directory'));
    src = ["" + from + "a/", "" + from + "b/", "" + from + "c/"];
    grunt.helper('hustler copy', src, to);
    test.equal(true, fs.existsSync("" + to + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + to + "b.js", 'should find b.js'));
    test.equal(true, fs.existsSync("" + to + "d/d.js", 'should find d.js inside d directory'));
    return test.done();
  }
};

exports['file to directory'] = {
  setUp: function(callback) {
    deleteDirectory(temp);
    createFile("" + from + "a.js", '');
    return callback();
  },
  tearDown: function(callback) {
    deleteDirectory(temp);
    return callback();
  },
  main: function(test) {
    var src;
    test.expect(2);
    test.equal(true, fs.existsSync("" + from + "a.js", 'should find a.js'));
    src = "" + from + "a.js";
    grunt.helper('hustler copy', src, to);
    test.equal(true, fs.existsSync("" + to + "a.js", 'should find a.js'));
    return test.done();
  }
};

exports['array of files to directory'] = {
  setUp: function(callback) {
    deleteDirectory(temp);
    createFile("" + from + "a.js", '');
    createFile("" + from + "b.js", '');
    return callback();
  },
  tearDown: function(callback) {
    deleteDirectory(temp);
    return callback();
  },
  main: function(test) {
    var src;
    test.expect(4);
    test.equal(true, fs.existsSync("" + from + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + from + "b.js", 'should find b.js'));
    src = ["" + from + "a.js", "" + from + "b.js"];
    grunt.helper('hustler copy', src, to);
    test.equal(true, fs.existsSync("" + to + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + to + "b.js", 'should find b.js'));
    return test.done();
  }
};

exports['file match to directory'] = {
  setUp: function(callback) {
    deleteDirectory(temp);
    createFile("" + from + "a.js", '');
    createFile("" + from + "b.js", '');
    createFile("" + from + "c.html", '');
    return callback();
  },
  tearDown: function(callback) {
    deleteDirectory(temp);
    return callback();
  },
  main: function(test) {
    var src;
    test.expect(6);
    test.equal(true, fs.existsSync("" + from + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + from + "b.js", 'should find b.js'));
    test.equal(true, fs.existsSync("" + from + "c.html", 'should find c.html'));
    src = "" + from + "**/*.js";
    grunt.helper('hustler copy', src, to);
    test.equal(true, fs.existsSync("" + to + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + to + "b.js", 'should find b.js'));
    test.equal(false, fs.existsSync("" + to + "c.html", 'should not find c.html'));
    return test.done();
  }
};

exports['array of file matches to directory'] = {
  setUp: function(callback) {
    deleteDirectory(temp);
    createFile("" + from + "a.js", '');
    createFile("" + from + "b.js", '');
    createFile("" + from + "c.html", '');
    createFile("" + from + "d.html", '');
    createFile("" + from + "e.txt", '');
    return callback();
  },
  tearDown: function(callback) {
    deleteDirectory(temp);
    return callback();
  },
  main: function(test) {
    var src;
    test.expect(10);
    test.equal(true, fs.existsSync("" + from + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + from + "b.js", 'should find b.js'));
    test.equal(true, fs.existsSync("" + from + "c.html", 'should find c.html'));
    test.equal(true, fs.existsSync("" + from + "d.html", 'should find d.html'));
    test.equal(true, fs.existsSync("" + from + "e.txt", 'should find e.txt'));
    src = ["" + from + "**/*.js", "" + from + "**/*.html"];
    grunt.helper('hustler copy', src, to);
    test.equal(true, fs.existsSync("" + to + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + to + "b.js", 'should find b.js'));
    test.equal(true, fs.existsSync("" + to + "c.html", 'should find c.html'));
    test.equal(true, fs.existsSync("" + to + "d.html", 'should find d.html'));
    test.equal(false, fs.existsSync("" + to + "e.txt", 'should not find e.txt'));
    return test.done();
  }
};

exports['array of files, file matches, and directories to directory'] = {
  setUp: function(callback) {
    deleteDirectory(temp);
    createFile("" + from + "a.js", '');
    createFile("" + from + "b.js", '');
    createFile("" + from + "c/c.js", '');
    createFile("" + from + "d/d.js", '');
    createFile("" + from + "e/f/f.js", '');
    createFile("" + from + "g.html", '');
    createFile("" + from + "h.html", '');
    createFile("" + from + "i.txt", '');
    return callback();
  },
  tearDown: function(callback) {
    deleteDirectory(temp);
    return callback();
  },
  main: function(test) {
    var src;
    test.expect(16);
    test.equal(true, fs.existsSync("" + from + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + from + "b.js", 'should find b.js'));
    test.equal(true, fs.existsSync("" + from + "c/c.js", 'should find c.js'));
    test.equal(true, fs.existsSync("" + from + "d/d.js", 'should find d.js'));
    test.equal(true, fs.existsSync("" + from + "e/f/f.js", 'should find f/f.js'));
    test.equal(true, fs.existsSync("" + from + "g.html", 'should find g.html'));
    test.equal(true, fs.existsSync("" + from + "h.html", 'should find h.html'));
    test.equal(true, fs.existsSync("" + from + "i.txt", 'should find i.txt'));
    src = ["" + from + "a.js", "" + from + "b.js", "" + from + "c/", "" + from + "d/", "" + from + "e/", "" + from + "**/*.html"];
    grunt.helper('hustler copy', src, to);
    test.equal(true, fs.existsSync("" + to + "a.js", 'should find a.js'));
    test.equal(true, fs.existsSync("" + to + "b.js", 'should find b.js'));
    test.equal(true, fs.existsSync("" + to + "c.js", 'should find c.js'));
    test.equal(true, fs.existsSync("" + to + "d.js", 'should find d.js'));
    test.equal(true, fs.existsSync("" + to + "f/f.js", 'should find f/f.js'));
    test.equal(true, fs.existsSync("" + to + "g.html", 'should find g.html'));
    test.equal(true, fs.existsSync("" + to + "h.html", 'should find h.html'));
    test.equal(false, fs.existsSync("" + to + "i.txt", 'should not find i.txt'));
    return test.done();
  }
};

exports['file to file'] = {
  setUp: function(callback) {
    deleteDirectory(temp);
    createFile("" + from + "a.js", '');
    return callback();
  },
  tearDown: function(callback) {
    deleteDirectory(temp);
    return callback();
  },
  main: function(test) {
    var dest, src;
    test.expect(3);
    test.equal(true, fs.existsSync("" + from + "a.js", 'should find a.js'));
    src = "" + from + "a.js";
    dest = "" + to + "b.html";
    grunt.helper('hustler copy', src, dest);
    test.equal(false, fs.existsSync("" + to + "a.js", 'should not find a.js'));
    test.equal(true, fs.existsSync("" + to + "b.html", 'should find b.html'));
    return test.done();
  }
};