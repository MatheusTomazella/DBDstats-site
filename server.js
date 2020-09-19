const { response } = require('express');
const express = require( 'express' );
const app = express();
const { serverPort } = require( './config/SERVERconfig.json' )

app.use( express.static( 'src' ) );

app.get( '/', ( request, response ) => {
    response.sendFile( `${__dirname}/src/html/index.html` );
} )

app.get( '/user', ( request, response ) => {
    response.sendFile( `${__dirname}/src/html/user.html` );
} )

app.get( '/login', ( request, response ) => {
    response.sendFile( `${__dirname}/src/html/login.html` );
} )

app.get( '/signup', ( request, response ) => {
    response.sendFile( `${__dirname}/src/html/signup.html` );
} )

app.listen( serverPort );
