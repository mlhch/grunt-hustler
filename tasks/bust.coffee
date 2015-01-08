module.exports = (grunt) ->
	crypto = require 'crypto'
	fs = require 'fs'
	path = require 'path'
	toHex = (match) -> '\\x' + match.charCodeAt(0).toString(16)

	grunt.registerMultiTask 'bust', 'Renames files based on their hashed contents. Replaces their references.', ->
		@files.forEach (f) ->
			f.src.filter (filePath) ->
				unless grunt.file.exists filePath
					grunt.log.warn "Source file \"#{filePath}\" not found."
					false
				else
					true
			.map (filePath) ->
				cwd = f.orig.cwd

				dir = path.dirname filePath
				ext = path.extname filePath
				base = path.basename filePath, ext
				idir = dir.split(cwd)[1].replace /^[\\\/]/, ''

				contents = grunt.file.read filePath
				hash = crypto.createHash('sha1').update(contents).digest('hex').substr(0, 10)

				if base.indexOf(hash) > -1
					return grunt.verbose.ok "#{filePath} already contains a hashed name"

				newFileName = "#{idir}/#{base}.#{hash}#{ext}"
				newFilePath = path.join dir, "#{base}.#{hash}#{ext}"

				f.replaceIn.files.forEach (file) ->
					replaceFiles = grunt.file.expand file
					if replaceFiles.length > 0
						contents = grunt.file.read replaceFiles[0]
						toReplace = "#{idir}/#{base}#{ext}"

						exp = new RegExp toReplace.replace(/./g, toHex), "g"
						contents = contents.replace exp, newFileName
						grunt.file.write replaceFiles[0], contents

				fs.renameSync filePath, newFilePath
				grunt.verbose.ok "Busted file #{filePath} -> #{newFilePath}"