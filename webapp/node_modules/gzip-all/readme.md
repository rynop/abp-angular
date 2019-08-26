# gzip-all

Recursively generate `.gz` gzipped versions of files recursively for every file in a folder.

## API

A single function that takes two arguments: a [glob](https://www.npmjs.com/package/glob) string, and an optional object to pass in as options to glob.

Returns a promise that resolves to an array of all `.gz` files created.

## Programmatic usage

```js
const gzipAll = require('gzip-all')

gzipAll('**/content/*.md').then(newFiles => {
	console.log('yay, created', newFiles.length, 'compressed files!')
})
```

## CLI usage

```sh
gzip-all "**/content/*.md"
```

## License

[WTFPL](http://wtfpl2.com/)
