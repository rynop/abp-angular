var test = require('tape')
var denodeify = require('./index.js')
var Promise = require('native-promise-only')

var sentinel = {}
var promise = new Promise(function (resolve) {
  resolve(sentinel)
})

test('returns a function that uses promises instead of callbacks', function(t) {
	function wrap(val, key, callback) {
		return callback(null, {val: val, key: key})
	}
	var pwrap = denodeify(wrap)
	pwrap(sentinel, 'foo')
		.then(function (wrapper) {
			t.equal(wrapper.val, sentinel)
			t.equal(wrapper.key, 'foo')
			t.end()
		})
})
test('converts callback error arguments into rejection', function(t) {
	function fail(val, key, callback) {
		return callback(sentinel)
	}
	var pfail = denodeify(fail)
	pfail(promise, 'foo')
		.then(null, function (err) {
			t.equal(err, sentinel)
			t.end()
		})
})
test('resolves correctly when the wrapped function returns a promise anyway', function(t) {
	function wrap(val, key, callback) {
		return new Promise(function(resolve, reject) {
			resolve({val: val, key: key})
		})
	}
	var pwrap = denodeify(wrap)
	pwrap(sentinel, 'foo')
		.then(function (wrapper) {
			t.equal(wrapper.val, sentinel)
			t.equal(wrapper.key, 'foo')
			t.end()
		})
})
