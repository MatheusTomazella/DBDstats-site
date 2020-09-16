const query = new URLSearchParams( window.location.search );
const APIurl = "http://localhost:3305/";
const nameInput = getElementById( 'name' );
const passwordInput = getElementById( 'password' );

function loadUserPage( id, name ){
    let queryString = '?';
    if ( id != undefined ) queryString += `id=${id}&`
    else if ( name != undefined ) queryString +=  `name=${name}`;
    const userInfo = getRequest( APIurl, 'user', queryString );
    console.log( userInfo )
}
loadUserPage( query.get('id'), query.get('name') );

function getRequest( url, route, queryString ){
    var request = new XMLHttpRequest();
    request.open( "GET", url+route+queryString, false );
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( null );
    return JSON.parse( request.responseText );
}

function login( ){
    const name = nameInput.value;
    const pass
}