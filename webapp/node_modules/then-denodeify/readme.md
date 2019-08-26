Copied from https://github.com/then/promise/blob/master/src/node-extensions.js but without anything else attached.

[![Build Status](https://travis-ci.org/TehShrike/then-denodeify.svg)](https://travis-ci.org/TehShrike/then-denodeify)

Converts a function that calls an error-first callback into a function that returns a promise.

```js
var denodeify = require('denodeify')

var stat = denodeify(fs.stat)

stat('/tmp/butts').then(function(results) {

})
```

**However** if the original function happens to return a promise instead of calling the callback, everything will work as it should.
