lognormal
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Lognormal distribution.


## Installation

``` bash
$ npm install distributions-lognormal
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var createDist = require( 'distributions-lognormal' );
```

To create a lognormal distribution,

``` javascript
var dist = createDist();
```

The distribution is configurable and has the following methods...


#### dist.location( [value] )

This method is a setter/getter. If no `value` is provided, returns the distribution `location` parameter. To set the distribution `location` parameter,

``` javascript
dist.location( 10 );
```

The default `location` is 0.


#### dist.scale( [value] )

This method is a setter/getter. If no `value` is provided, returns the distribution `scale` parameter. To set the distribution `scale` parameter,

``` javascript
dist.scale( 5 );
```

The default `scale` is 1.


#### dist.support()

Returns the distribution support, which is all positive real numbers.

``` javascript
var support = dist.support();
// returns [5e-324, +inf]
```


#### dist.mean()

Returns the distribution `mean`.

``` javascript
var mean = dist.mean();
```


#### dist.variance()

Returns the distribution `variance`.

``` javascript
var variance = dist.variance();
```


#### dist.median()

Returns the distribution `median`.

``` javascript
var median = dist.median();
```


#### dist.mode()

Returns the distribution `mode`.

``` javascript
var mode = dist.mode();
```


#### dist.skewness()

Returns the distribution `skewness`.

``` javascript
var skewness = dist.skewness();
```

#### dist.ekurtosis()

Returns the distribution `excess kurtosis`.

``` javascript
var excess = dist.ekurtosis();
```


#### dist.information()

Returns the [Fisher information](http://en.wikipedia.org/wiki/Fisher_information).

``` javascript
var info = dist.information();
// returns [...]
```


#### dist.entropy()

Returns the distribution's [differential entropy](http://en.wikipedia.org/wiki/Differential_entropy).

``` javascript
var entropy = dist.entropy();
```


#### dist.pdf( [arr] )

If a vector is not provided, returns the probability density function (PDF). If a vector is provided, evaluates the PDF for each vector element.

``` javascript
var data = [ 5e-324, 0.5, 1, 1.5, 2, 5, 10 ];

var pdf = dist.pdf( data );
// returns [...]
```


#### dist.cdf( [arr] )

If a vector is not provided, returns the cumulative density function (CDF). If a vector is provided, evaluates the CDF for each vector element.

``` javascript
var data = [ 5e-324, 0.5, 1, 1.5, 2, 5, 10 ];

var cdf = dist.cdf( data );
// returns [...]
```



## Examples

``` javascript
var createDist = require( 'distributions-lognormal' );

// Define the distribution parameters...
var loc = 0,
	scale = 0.25,
	xLow = 0,
	xHigh = 200;

// Create a vector...
var vec = new Array( 1000 ),
	len = vec.length,
	inc;

inc = ( xHigh - xLow ) / len;

for ( var i = 0; i < len; i++ ) {
	vec[ i ] = inc*i + xLow;
}

// Create a lognormal distribution and configure...
var lognormal = createDist()
	.location( loc )
	.scale( scale );

// Evaluate the probability density function over the vector...
var pdf = lognormal.pdf( vec );

// Find the max...
var max = pdf[ 0 ],
	idx = 0;
for ( var j = 1; j < pdf.length; j++ ) {
	if ( pdf[ j ] > max ) {
		max = pdf[ j ];
		idx = j;
	}
}
console.log( 'Max: ' + vec[ idx ] );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/distributions-lognormal.svg
[npm-url]: https://npmjs.org/package/distributions-lognormal

[travis-image]: http://img.shields.io/travis/distributions-io/lognormal/master.svg
[travis-url]: https://travis-ci.org/distributions-io/lognormal

[coveralls-image]: https://img.shields.io/coveralls/distributions-io/lognormal/master.svg
[coveralls-url]: https://coveralls.io/r/distributions-io/lognormal?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/lognormal.svg
[dependencies-url]: https://david-dm.org/distributions-io/lognormal

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/lognormal.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/lognormal

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/lognormal.svg
[github-issues-url]: https://github.com/distributions-io/lognormal/issues