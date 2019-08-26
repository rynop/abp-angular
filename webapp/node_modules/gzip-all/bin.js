#!/usr/bin/env node

const gzipAll = require('./index')

const path = process.argv[2]

gzipAll(path)
	.then(gzippedFiles => console.log('gzipped', gzippedFiles.length, 'files'))
	.catch(err => console.error(err))
