const APIurl = "http://localhost:3305/";
const SITEurl = 'http://localhost:3306/'

function loadUserPage( id, name ){
    let queryString = '';
    /*if ( query.profile = 'true' ){
        const cookies = getElements( document.cookie, ',' );
        console.log( cookies )
        id = cookies.user_id;
        name = cookies.user_name;
    }*/
    if ( name != undefined ) queryString +=  `name=${name}`;
    else window.location.href = `${SITEurl}login`;
    const userInfo = getRequest( APIurl, 'user', queryString )[0];
    if ( userInfo == undefined ){ 
        document.cookie = undefined;
        window.location.href = SITEurl+'login'
    }
    document.getElementById( 'name' ).innerText = userInfo.name;
    document.getElementById( 'killer_rank' ).innerText = userInfo.killer_rank;
    document.getElementById( 'survivor_rank' ).innerText = userInfo.survivor_rank;
}

function getRequest( url, route, queryString ){
    var request = new XMLHttpRequest();
    console.log(url+route+'?'+queryString)
    request.open( "GET", url+route+'?'+queryString, false );
    request.setRequestHeader('Content-Type', 'application/json');
    request.send( null );
    return JSON.parse( request.responseText );
}

function login( ){
    const name = document.getElementById( 'name' ).value;
    const password = document.getElementById( 'password' ).value;
    const user = getRequest( APIurl, 'user', `name=${name}&password=${password}` )[0];
    if ( user != undefined ){
        document.cookie = `user_name=${name}, user_id=${user.id}, user_password=${password}`
        window.location.href = `${SITEurl}user?name=${name}`;
    }
}

function searchUser( ){
    const user = document.getElementById( 'search' ).value;
    window.location.href = `${SITEurl}user?name=${user}`;
}

function getElements ( string, split ) {
    var cookies = {};
    string.split(split).forEach(function(cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
}