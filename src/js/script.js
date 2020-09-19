const APIurl = "http://localhost:3305/";
const SITEurl = 'http://localhost:3306/'

function loadUserPage( id, name, profile ){
    if ( profile == 'true' || profile == true ){
        const cookies = getElements( document.cookie.substring(10), ';' );
        name = cookies.user_name;
        if ( name == undefined ) window.location.href = `${SITEurl}login`
    }
    const userInfo = getRequest( APIurl, 'user', `name=${name}` )[0];
    if ( userInfo.name == undefined ) window.location.href = `${SITEurl}login`;
    document.getElementById( 'name' ).innerText = userInfo.name;
    document.getElementById( 'killer_rank' ).innerText = userInfo.killer_rank;
    document.getElementById( 'survivor_rank' ).innerText = userInfo.survivor_rank;
    loadUserMatches( id, name );
}

function loadUserMatches( id, name ){
    if ( id == undefined ) id = getRequest( APIurl, 'user', `name=${name}` )[0].id;
    const survivor_matches = getRequest( APIurl, 'match/survivor', `userId=${id}` ).forEach( ( match ) => {
        addMatch( match, 'survivor' );
    } );
    const killer_match = getRequest( APIurl, 'match/killer', `userId=${id}` );
    console.log( survivor_matches, killer_match )
}

function addMatch( match, type ){
    
}

function login ( ) {
    let name = document.getElementById( 'name' ).value;
    let password = document.getElementById( 'password' ).value;
    if ( name.trim() == '' || password.trim() == '' ){
        document.getElementById('name').value = '';
        document.getElementById('password').value = '';
        return;
    }
    const user = getRequest( APIurl, 'user', `name=${name}&password=${password}` )[0];
    if ( user != undefined ){
        document.cookie = `user_name=${name}`;
        document.cookie =  `user_password=${password}`;
        document.cookie = `user_id=${user.id}`;
        window.location.href = `${SITEurl}user?name=${name}`;
    }
}

function signup ( ) {
    const name = document.getElementById( 'name' );
    const password = document.getElementById( 'password' );
    const conf_password = document.getElementById( 'conf-password' );
    if ( password.value != conf_password.value ){
        name.value = '';
        password.value = '';
        conf_password.value = '';
        return;
    }
    if ( name.value == undefined || password.value == undefined ){
        name.value = '';
        password.value = '';
        conf_password.value = '';
        return;
    }
    const user = postRequest( APIurl, 'user', {
        name: name.value,
        password: password.value,
        killer_rank: 20,
        survivor_rank: 20
    } );
    if ( user.code != undefined ) console.log( user );
    else window.location.href = `${SITEurl}login`;
}

function getRequest( url, route, queryString ){
    var request = new XMLHttpRequest();
    console.log(url+route+'?'+queryString)
    request.open( "GET", url+route+'?'+queryString, false );
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( null );
    return JSON.parse( request.responseText );
}

function postRequest( url, route, body ){
    const request = new XMLHttpRequest();
    console.log( url+route+' -> ' );
    console.log( body );
    request.open( 'POST', url+route, false );
    request.setRequestHeader( 'Content-Type', 'application/json' );
    request.send( JSON.stringify( body ) );
    return JSON.parse( request.responseText );
}

function searchUser( ){
    const user = document.getElementById( 'search' ).value;
    window.location.href = `${SITEurl}user?name=${user}`;
}

function getElements ( string, split ) {
    var cookies = {};
    if ( split == ',' ) string = string.substring(1)
    if ( string == undefined || string == '' ) return undefined;
    string.split(split).forEach(function(cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
}