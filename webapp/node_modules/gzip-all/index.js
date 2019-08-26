const zlib = require('zlib')
const fs = require('fs')

const denodeify = require('then-denodeify')
const promiseMap = require('p-map')
const glob = denodeify(require('glob'))

module.exports = function gzipAllFiles(path, options) {
	return glob(path, options).then(files => {
		return promiseMap(files, gzipFile, { concurrency: 5 })
	})
}

function gzipFile(file) {
	return new Promise((resolve, reject) => {
		const gzip = zlib.createGzip({ level: zlib.Z_BEST_COMPRESSION })
		const gzippedFileName = file + '.gz'

		fs.createReadStream(file)
			.on('error', reject)
			.pipe(gzip)
			.pipe(fs.createWriteStream(gzippedFileName))
			.on('finish', () => resolve(gzippedFileName))
	})
}
