require('hard-rejection')()
const assert = require('power-assert')
const rimraf = require('rimraf')
const gzipAll = require('./')
const glob = require('glob')

function cleanUp() {
	rimraf(`./fixtures/*.gz`, err => {
		assert.ifError(err)
	})
}

gzipAll(`./fixtures/*.@(md|txt)`).then(gzippedFiles => {
	assert.equal(gzippedFiles.length, 2)
	glob(`./fixtures/*.gz`, (err, gzippedFiles) => {
		assert.ifError(err)
		assert.equal(gzippedFiles.length, 2)
		cleanUp()
	})
}).catch(err => {
	assert.ifError(err)
	cleanUp()
})
