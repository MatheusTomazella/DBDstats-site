const { response } = require('express');
const express = require( 'express' );
const app = express();
const { serverPort } = require( './config/SERVERconfig.json' )

app.use( express.static( 'src' ) );

app.get( '/', ( request, response ) => {
    response.sendFile( `${__dirname}/src/html/index.html` );
} )

app.get( '/user', ( request, response ) => {
    if ( getUserCookies( request ) == undefined ) response.redirect( '/login' )
    response.sendFile( `${__dirname}/src/html/user.html` );
} )

app.get( '/login', ( request, response ) => {
    response.sendFile( `${__dirname}/src/html/login.html` );
} )

app.listen( serverPort );


function getUserCookies (request) {
    var cookies = {};
    if ( request.headers.cookie == undefined ) return undefined;
    request.headers && request.headers.cookie.split(',').forEach(function(cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies['user_id'];
}