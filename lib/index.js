/**
*
*	DISTRIBUTIONS: lognormal
*
*
*	DESCRIPTION:
*		- Lognormal distribution.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var erf = require( 'compute-erf' );


	// FUNCTIONS //

	/**
	* FUNCTION: getPDF( loc, scale )
	*	Returns a probability density function for a distribution.
	*
	* @private
	* @param {Number} loc - location parameter
	* @param {Number} scale - scale parameter
	* @returns {Function} probability density function (PDF)
	*/
	function getPDF( loc, scale ) {
		var A = 1 / (Math.sqrt( 2*Math.PI ) * scale ),
			B = -1 / (2*scale*scale);
		/**
		* FUNCTION: pdf( x )
		*	Evaluates the probability distribution function at input value `x`.
		*
		* @private
		* @param {Number} x - input value
		* @returns {Number} evaluated PDF
		*/
		return function pdf( x ) {
			if ( x === 0 ) {
				return 0;
			}
			// TODO: FIXME: for x<<<1, then D may be 0 and A/x --> infinity due to numerical precision; returns NaN. 
			var C = Math.log( x ) - loc,
				D = Math.exp( B*C*C );
			return A/x * Math.exp( B*C*C );
		};
	} // end FUNCTION getPDF()

	/**
	* FUNCTION: getCDF( loc, scale )
	*	Returns a cumulative density function for a distribution.
	*
	* @private
	* @param {Number} loc - location parameter
	* @param {Number} scale - scale parameter
	* @returns {Function} cumulative density function (CDF)
	*/
	function getCDF( loc, scale ) {
		var A = 1 / 2,
			B = 1 / (Math.SQRT2*scale);
		/**
		* FUNCTION: cdf( x )
		*	Evaluates the cumulative distribution function at input value `x`.
		*
		* @private
		* @param {Number} x - input value
		* @returns {Number} evaluated CDF
		*/
		return function cdf( x ) {
			var C = Math.log( x ) - loc;
			return A * (1 + erf( C / B ));
		};
	} // end FUNCTION getCDF()


	// DISTRIBUTION //

	/**
	* FUNCTION: Distribution()
	*	Distribution constructor.
	*
	* @constructor
	* @returns {Distribution} Distribution instance
	*/
	function Distribution() {
		this._location = 0;
		this._scale = 1;
		return this;
	} // end FUNCTION Distribution()

	/**
	* METHOD: location( [value] )
	*	Location parameter setter and getter. If a value is provided, sets the location parameter. If no value is provided, returns the location parameter.
	*
	* @param {Number} [value] - location parameter
	* @returns {Distribution|Number} Distribution instance or location parameter
	*/
	Distribution.prototype.location = function( value ) {
		if ( !arguments.length ) {
			return this._location;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new TypeError( 'location()::invalid input argument. Location parameter must be numeric.' );
		}
		this._location = value;
		return this;
	}; // end METHOD location()

	/**
	* METHOD: scale( [value] )
	*	Scale parameter setter and getter. If a value is provided, sets the scale parameter. If no value is provided, returns the scale parameter.
	*
	* @param {Number} [value] - scale parameter
	* @returns {Distribution|Number} Distribution instance or scale parameter
	*/
	Distribution.prototype.scale = function( value ) {
		if ( !arguments.length ) {
			return this._scale;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new TypeError( 'scale()::invalid input argument. Scale parameter must be numeric.' );
		}
		if ( value <= 0 ) {
			throw new Error( 'scale()::invalid input argument. Scale parameter must be greater than 0.' );
		}
		this._scale = value;
		return this;
	}; // end METHOD scale()

	/**
	* METHOD: support()
	*	Returns the distribution support.
	*
	* @returns {Array} distribution support
	*/
	Distribution.prototype.support = function() {
		return [ 5e-324, Number.POSITIVE_INFINITY ]; // smallest JavaScript value to represent (0, +inf )
	}; // end METHOD support()

	/**
	* METHOD: mean()
	*	Returns the distribution mean.
	*
	* @returns {Distribution|Number} Distribution instance or mean value
	*/
	Distribution.prototype.mean = function( value ) {
		var loc = this._location,
			scale = this._scale;
		return Math.exp( (loc + scale*scale) / 2 );
	}; // end METHOD mean()

	/**
	* METHOD: variance()
	*	Returns the distribution variance.
	*
	* @returns {Distribution|Number} Distribution instance or variance
	*/
	Distribution.prototype.variance = function( value ) {
		var scale = this._scale,
			A = scale*scale,
			B = Math.exp( A ) - 1,
			C = 2*this._location + A;
		return B * Math.exp( C );
	}; // end METHOD variance()

	/**
	* METHOD: median()
	*	Returns the distribution median.
	*
	* @returns {Number} median
	*/
	Distribution.prototype.median = function( value ) {
		return Math.exp( this._location );
	}; // end METHOD median()

	/**
	* METHOD: mode()
	*	Returns the distribution mode.
	*
	* @returns {Number} mode
	*/
	Distribution.prototype.mode = function( value ) {
		var loc = this._location,
			scale = this._scale;
		return Math.exp( loc - scale*scale );
	}; // end METHOD mode()

	/**
	* METHOD: skewness()
	*	Returns the distribution skewness.
	*
	* @returns {Number} skewness
	*/
	Distribution.prototype.skewness = function( value ) {
		var scale = this._scale,
			A = Math.exp( scale*scale ),
			B = A + 2,
			C = Math.sqrt( A - 1 );
		return B * C;
	}; // end METHOD skewness()

	/**
	* METHOD: ekurtosis()
	*	Returns the distribution excess kurtosis.
	*
	* @returns {Number} excess kurtosis
	*/
	Distribution.prototype.ekurtosis = function( value ) {
		var exp = Math.exp,
			scale = this._scale,
			A = scale*scale,
			B = exp( 4*A ),
			C = 2 * exp( 3*A ),
			D = 3 * exp( 2*A );
		return B + C + D - 6;
	}; // end METHOD ekurtosis()

	/**
	* METHOD: information()
	*	Returns the Fisher information.
	*
	* @returns {Array} Fisher information
	*/
	Distribution.prototype.information = function() {
		var scale = this._scale,
			A = scale*scale,
			arr = new Array( 2 );

		arr[ 0 ] = [ 1/A, 0 ];
		arr[ 1 ] = [ 0, 2/A ];
		return arr;
	}; // end METHOD information()

	/**
	* METHOD: entropy()
	*	Returns the entropy.
	*
	* @returns {Number} entropy
	*/
	Distribution.prototype.entropy = function() {
		var scale = this._scale,
			A = scale*scale;
		return 0.5 + 0.5*Math.log( 2*Math.PI*A ) + this._location;
	}; // end METHOD entropy()

	/**
	* METHOD: pdf( [vec] )
	*	If provided an input vector, evaluates the distribution PDF for each vector element. IF no input argument is provided, returns the PDF.
	*
	* @param {Array} [vec] - 1d input array
	* @returns {Function|Array} distribution PDF or evaluated PDF
	*/
	Distribution.prototype.pdf = function( vec ) {
		var pdf, len, arr, val;

		pdf = getPDF( this._location, this._scale );

		if ( !arguments.length ) {
			return pdf;
		}
		if ( !Array.isArray( vec ) ) {
			throw new TypeError( 'pdf()::invalid input argument. Must provide an array.' );
		}
		len = vec.length;
		arr = new Array( len );
		for ( var i = 0; i < len; i++ ) {
			val = vec[ i ];
			if ( typeof val !== 'number' || val !== val ) {
				throw new TypeError( 'pdf()::invalid input argument. Array must only contain numeric values.' );
			}
			arr[ i ] = pdf( val );
		}
		return arr;
	}; // end METHOD pdf()

	/**
	* METHOD: cdf( [vec] )
	*	If provided an input vector, evaluates the distribution CDF for each vector element. IF no input argument is provided, returns the CDF.
	*
	* @param {Array} [vec] - 1d input array
	* @returns {Function|Array} distribution CDF or evaluated CDF
	*/
	Distribution.prototype.cdf = function( vec ) {
		var cdf, len, arr, val;

		cdf = getCDF( this._location, this._scale );

		if ( !arguments.length ) {
			return cdf;
		}
		if ( !Array.isArray( vec ) ) {
			throw new TypeError( 'cdf()::invalid input argument. Must provide an array.' );
		}
		len = vec.length;
		arr = new Array( len );
		for ( var i = 0; i < len; i++ ) {
			val = vec[ i ];
			if ( typeof val !== 'number' || val !== val ) {
				throw new TypeError( 'cdf()::invalid input argument. Array must only contain numeric values.' );
			}
			arr[ i ] = cdf( val );
		}
		return arr;
	}; // end METHOD cdf()


	// EXPORTS //

	module.exports = function createDistribution() {
		return new Distribution();
	};

})();