var createDist = require( './../lib' );

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