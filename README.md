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

To create a distribution,

``` javascript
var dist = createDist();
```

The distribution is configurable and has the following methods...


#### dist.support()

Returns the distribution support.

``` javascript
dist.support();
// returns 
```


#### dist.mean( [value] )

This method is a setter/getter. If no `value` is provided, returns the distribution `mean`. To set the distribution `mean`,

``` javascript
dist.mean( 100 );
```


#### dist.variance( [value] )

This method is a setter/getter. If no `value` is provided, returns the distribution `variance`. To set the distribution `variance`,

``` javascript
dist.variance();
```


#### dist.median()

Returns the distribution `median`.

``` javascript
var median = dist.median();
// equals 
```


#### dist.mode()

Returns the distribution `mode`.

``` javascript
var mode = dist.mode();
// equals 
```


#### dist.skewness()

Returns the distribution `skewness`.

``` javascript
var skewness = dist.skewness();
// returns 
```

#### dist.ekurtosis()

Returns the distribution `excess kurtosis`.

``` javascript
var excess = dist.ekurtosis();
// returns 
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
// 
```

#### dist.pdf( [arr] )

If a vector is not provided, returns the probability density function (PDF). If a vector is provided, evaluates the PDF for each vector element.

``` javascript
var data = [ -1, -0.5, 0, 0.5, 1 ];

var pdf = dist.pdf( data );
// returns [...]
```

#### dist.cdf( [arr] )

If a vector is not provided, returns the cumulative density function (CDF). If a vector is provided, evaluates the CDF for each vector element.

``` javascript
var data = [ -1, -0.5, 0, 0.5, 1 ];

var cdf = dist.cdf( data );
// returns [...]
```


#### dist.inv( [arr] )

If a cumulative probability vector is not provided, returns the inverse cumulative distribution function (aka the quantile function). If a cumulative probability vector is provided, evaluates the quantile function for each vector element.

``` javascript
var probs = [ 0.025, 0.5, 0.975 ];

var quantiles = dist.inv( probs );
// returns [...]
``` 

Note: all vector values must exist on the interval `[0, 1]`.



## Examples

``` javascript
var createDist = require( 'distributions-lognormal' );
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