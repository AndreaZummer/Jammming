
// User Authorization

async function userAuth() {
  const stateKey = 'auth_state_key';

  function codeVerification(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const codeVerifier  = codeVerification(128);
  localStorage.setItem('code_verifier', codeVerifier);

  async function sha256 (plain){
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    await window.crypto.subtle.digest('SHA-256', data)
  };
  
  const hashed = sha256(codeVerifier);

  function base64encode(input) {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem(stateKey, text);
    return text;
  };

  async function userAuthRequest() {
    const url= new URL("https://accounts.spotify.com/authorize");

    const params = {
      client_id: '32fd7115babc4ea9a080fde3bb3d88df',
      redirect_uri: 'http://localhost:3000',
      response_type: 'code',
      scope: 'ugc-image-upload playlist-modify-public playlist-modify-private',
      codeChallenge: base64encode(hashed),
      state: generateRandomString(16),
      code_challenge_method: 'S256',
    }
    
    url.search = new URLSearchParams(params).toString();
    window.location.href=url.toString();
  };
  await userAuthRequest();
};

async function getCode() {
  const stateKey = 'auth_state_key';
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  localStorage.setItem('code', code);
  let state = urlParams.get('state');
    if (!code || state==null || state!==localStorage.getItem(stateKey)) {
      new Error ('Authorization Failure');
    }
};

async function requestForToken() {
  const code = localStorage.getItem('code');
  const url = "https://accounts.spotify.com/api/token";
  const codeVerifier = localStorage.getItem('code_verifier');
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: '32fd7115babc4ea9a080fde3bb3d88df',
      redirect_uri: 'http://localhost:3000',
      grant_type: 'authorization_code',
      code: code,
      code_verifier: codeVerifier,
    }),
  }
  
  try{
    const response = await fetch(url, payload);
    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    const body = await response.json();
    localStorage.setItem('access_token', body.access_token);
    localStorage.setItem('refresh_token', body.refresh_token);
    localStorage.removeItem('code');
  }
  catch(error) {
    console.log('Error getting access token', error)
  }
};
  








/*
// Request for Access Token 
async function getAccessToken() {
  let stateKey = 'spotify_auth_state';

  function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ( e === r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  const params = getHashParams();
  var access_token = params.access_token,
      state = params.state,
      storedState = localStorage.getItem(stateKey);
  if (access_token && (state == null || state !== storedState)) {
    alert('There was an error during the authentication');
  } else {
      localStorage.removeItem(stateKey);
    };

  function requestForToken() {

    const client_id = '32fd7115babc4ea9a080fde3bb3d88df';
    const redirect_uri = 'http://localhost:3000';
    let stateKey = 'spotify_auth_state';

    function generateRandomString(length) {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    let state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    const scope = 'ugc-image-upload playlist-modify-public playlist-modify-private';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  }
  requestForToken();
  const expirationTime = Date.now() + 3600000;
  localStorage.setItem('expiration_time', expirationTime);
};
// Checks if access token is expired

async function expirationChecker() {
  const expirationTime=localStorage.getItem('expiration_time');
  const actualTime=Date.now();
  if(expirationTime <= actualTime) {
    await getAccessToken();
  }
};*/
// Checks if user is logged in

async function logginChecker() {
  const params = new URLSearchParams(window.location.search.substring(1));
  if (params.size===0) {
      await userAuth();
  }

  await getCode();
  await requestForToken();
};

async function getProfile() {
  await logginChecker();
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    }
  });
  
  const data = await response.json();
  localStorage.setItem('userID', data.id);
  return data.id;
};

async function getSearchResults(searchedText) {
  const url='https://api.spotify.com/v1/search?q='+searchedText+'&type=track&market=SK&limit=20';

  try {
    const response = await fetch(url,{
      headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    };
    const body = await response.json();
    const tracklist = body.tracks.items;
    return tracklist;
  }
  catch(error) {
    console.log("Error getting results:", error);
  }
};

async function addPlaylistToSpotify(playlistName) {

  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${localStorage.getItem('userID')}/playlists`, {
        method:'POST',
        headers: {
          'Authorization':'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": playlistName,
          "description": "Custom Playlist",
          "public": false
        })
      });
    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    const body = await response.json();
    const playlistID = body.id;
    localStorage.setItem('playlistID', playlistID);
    return playlistID;
  }
  catch(error) {
    console.log("Error adding to Spotify:", error);
  };
};

async function addPlaylistCover() {
  let uploadImage = localStorage.getItem('uploadImage');

  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${localStorage.getItem('playlistID')}/images`, {
        method:'PUT',
        headers: {
          'Authorization':'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'image/jpeg',
        },
        body: uploadImage,
    });
    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    await response.json();
  }
  catch(error) {
    console.log("Error adding to Spotify:", error);
  };
  localStorage.removeItem('uploadImage');
};

async function addTracksToPlaylist(uriList,playlistName) {
  await addPlaylistToSpotify(playlistName);
  
  if (localStorage.getItem('uploadImage')) {
    await addPlaylistCover()};
  
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${localStorage.getItem('userID')}/playlists/${localStorage.getItem('playlistID')}/tracks`, {
      method:'POST',
      headers: {
        'Authorization':'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "uris": uriList,
        "position": 0,
      })
    })
    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    await response.json();
  }
  catch(error) {
    console.log("Error adding to Spotify:", error);
  };
  localStorage.removeItem('playlistID');
};

export {getSearchResults, addTracksToPlaylist, getProfile, addPlaylistToSpotify, userAuth/*expirationChecker*/};
