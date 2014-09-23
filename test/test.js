
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createDist = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-lognormal', function tests() {
	'use strict';

	// SETUP //

	var dist;

	beforeEach( function() {
		dist = createDist();
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( createDist ).to.be.a( 'function' );
	});

	describe( 'location', function test() {

		it( 'should provide a setter/getter for the location parameter', function test() {
			expect( dist.location ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided a non-numeric location', function test() {
			var values = [
					'5',
					true,
					undefined,
					null,
					NaN,
					[],
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.location( value );
				};
			}
		});

		it( 'should set the distribution location parameter', function test() {
			dist.location( 100 );
			assert.strictEqual( dist.location(), 100 );
		});

	}); // end TESTS location

	describe( 'scale', function test() {

		it( 'should provide a setter/getter for the scale parameter', function test() {
			expect( dist.scale ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided a non-numeric scale', function test() {
			var values = [
					'5',
					true,
					undefined,
					null,
					NaN,
					[],
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.scale( value );
				};
			}
		});

		it( 'should throw an error if provided a non-positive scale', function test() {
			expect( badValue( -1 ) ).to.throw( Error );
			function badValue( value ) {
				return function() {
					dist.scale( value );
				};
			}
		});

		it( 'should set the distribution scale parameter', function test() {
			dist.scale( 100 );
			assert.strictEqual( dist.scale(), 100 );
		});

	}); // end TESTS scale

	describe( 'support', function tests() {

		it( 'should provide a method to get the distribution support', function test() {
			expect( dist.support ).to.be.a( 'function' );
		});

		it( 'should return the support', function test() {
			assert.deepEqual( dist.support(), [5e-324, Number.POSITIVE_INFINITY ] );
		});

	}); // end TESTS support

	describe( 'mean', function tests() {

		it( 'should provide a method for the distribution mean', function test() {
			expect( dist.mean ).to.be.a( 'function' );
		});

		it( 'should return the mean', function test() {
			dist.location( 1 )
				.scale( 1 );
			expect( dist.mean() ).to.be.a( 'number' );
			assert.strictEqual( dist.mean(), Math.E );
		});

	}); // end TESTS mean

	describe( 'variance', function tests() {

		it( 'should provide a method for the distribution variance', function test() {
			expect( dist.variance ).to.be.a( 'function' );
		});

		it( 'should return the variance', function test(){
			dist.location( 0 )
				.scale( 1 );

			var s2 = dist.variance(),
				expected = Math.E*Math.E - Math.E;

			assert.closeTo( s2, expected, 1e-7 );
		});

	}); // end TESTS variance

	describe( 'median', function tests() {

		it( 'should provide a method to get the distribution median', function test() {
			expect( dist.median ).to.be.a( 'function' );
		});

		it( 'should return the median value', function test() {
			dist.location( 0 );
			assert.strictEqual( dist.median(), 1 );
		});

	}); // end TESTS median

	describe( 'mode', function tests() {

		it( 'should provide a method to get the distribution mode', function test() {
			expect( dist.mode ).to.be.a( 'function' );
		});

		it( 'should return the mode', function test() {
			dist.location( 1 )
				.scale( 1 );
			assert.strictEqual( dist.mode(), 1 );
		});

	}); // end TESTS mode

	describe( 'skewness', function tests() {

		it( 'should provide a method to get the distribution skewness', function test() {
			expect( dist.skewness ).to.be.a( 'function' );
		});

		it( 'should return the skewness', function test() {
			dist.scale( 1 );
			var skew = ( Math.E + 2 ) * Math.sqrt( Math.E - 1 );
			assert.closeTo( dist.skewness(), skew, 1e-7 );
		});

	}); // end TESTS skewness

	describe( 'excess kurtosis', function tests() {

		it( 'should provide a method to get the distribution excess kurtosis', function test() {
			expect( dist.ekurtosis ).to.be.a( 'function' );
		});

		it( 'should return the excess kurtosis', function test() {
			dist.scale( 1 );
			var ek = Math.exp( 4 ) + 2*Math.exp( 3 ) + 3*Math.exp( 2 ) - 6;
			assert.closeTo( dist.ekurtosis(), ek, 1e-7 );
		});

	}); // end TESTS kurtosis

	describe( 'entropy', function tests() {

		it( 'should provide a method to get the distribution entropy', function test() {
			expect( dist.entropy ).to.be.a( 'function' );
		});

		it( 'should return the distribution entropy', function test() {
			dist.location( 0 )
				.scale( 1 );

			var entropy = 0.5 + 0.5*Math.log( 2*Math.PI );

			assert.closeTo( dist.entropy(), entropy, 1e-7 );
		});

	}); // end TESTS entropy

	describe( 'information', function tests() {

		it( 'should provide a method to get the distribution information', function test() {
			expect( dist.information ).to.be.a( 'function' );
		});

		it( 'should return the distribution information', function test() {
			dist.scale( 1 );
			assert.deepEqual( dist.information(), [[1, 0], [0, 2]] );
		});

	}); // end TESTS information

	describe( 'pdf', function tests() {

		it( 'should provide a method to get/evaluate the distribution PDF', function test() {
			expect( dist.pdf ).to.be.a( 'function' );
		});

		it( 'should return a function', function test() {
			expect( dist.pdf() ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided an array', function test() {
			var values = [
					5,
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.pdf( value );
				};
			}
		});

		it( 'should throw an error if array contains non-numeric values', function test() {
			var values = [
					[],
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.pdf( [value] );
				};
			}
		});

		it( 'should evaluate the pdf', function test() {
			var data = [ 0, 5e-324, 0.5, 1, 1.5, 2, 10 ];
			expect( dist.pdf( data ) ).to.be.an( 'array' );
		});

	}); // end TESTS pdf

	describe( 'cdf', function tests() {

		it( 'should provide a method to get/evaluate the distribution CDF', function test() {
			expect( dist.cdf ).to.be.a( 'function' );
		});

		it( 'should return a function', function test() {
			expect( dist.cdf() ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided an array', function test() {
			var values = [
					5,
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.cdf( value );
				};
			}
		});

		it( 'should throw an error if array contains non-numeric values', function test() {
			var values = [
					[],
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.cdf( [value] );
				};
			}
		});

		it( 'should evaluate the cdf', function test() {
			var data = [ 5e-324, 0.5, 1, 1.5, 2, 10 ];
			expect( dist.cdf( data ) ).to.be.an( 'array' );
		});
	}); // end TESTS cdf

});