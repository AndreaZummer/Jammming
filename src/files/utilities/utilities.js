const client_id = '32fd7115babc4ea9a080fde3bb3d88df'
const redirect_uri = 'http://localhost:3000'

// User Authorization

async function userAuth() {
  const stateKey = 'auth_state_key';

  function codeVerification(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const codeVerifier  = codeVerification(64);
  localStorage.setItem('code_verifier', codeVerifier);

  async function sha256 (plain){
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  };
  
  const hashed = await sha256(codeVerifier);

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
      client_id: client_id,
      redirect_uri: redirect_uri,
      response_type: 'code',
      scope: 'ugc-image-upload playlist-modify-public playlist-modify-private',
      code_challenge: base64encode(hashed),
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

// Request for Access Token
async function requestForToken() {
  const code = localStorage.getItem('code');
  const url = "https://accounts.spotify.com/api/token";
  const codeVerifier = localStorage.getItem('code_verifier');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: client_id,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirect_uri,
      code_verifier: codeVerifier,
    }),
  });

  try{
    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    const body = await response.json();
    sessionStorage.setItem('access_token', body.access_token);
    sessionStorage.setItem('refresh_token', body.refresh_token);
    console.log(sessionStorage.getItem('refresh_token'));
    localStorage.removeItem('code');
    setTimeout(() => {
      refreshToken()
    }, 3500000);
  }
  catch(error) {
    console.log('Error getting access token', error)
  }
};

// Expiration handle
async function refreshToken() {
  const refresh_token = sessionStorage.getItem('refresh_token');
  const url = "https://accounts.spotify.com/api/token";

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: client_id,
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
  });
  if(!response.ok) {
    throw new Error("Error get refresh token");
  }
  const body = await response.json();
  sessionStorage.setItem('access_token', body.access_token);
  sessionStorage.setItem('refresh_token', body.refresh_token);
  setInterval(() => {
    refreshToken()
  }, 3500000);
}

// Get current user ID
async function getProfile() {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
    }
  });
  
  const data = await response.json();
  localStorage.setItem('userID', data.id);
  return data.id;
};
// Checks if user is logged in

async function logginChecker() {
  const params = new URLSearchParams(window.location.search.substring(1));
  if (params.size===0) {
    await userAuth();
  }
  await getCode();
  await requestForToken();
};

if(!sessionStorage.getItem('access_token')) {
logginChecker();
}

// Get Search Results
async function getSearchResults(searchedText) {
  const url='https://api.spotify.com/v1/search?q='+searchedText+'&type=track&market=SK&limit=20';
  try {
    const response = await fetch(url,{
      headers: {
        'Authorization': 'Bearer '+ sessionStorage.getItem('access_token'),
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
  await getProfile();

  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${localStorage.getItem('userID')}/playlists`, {
        method:'POST',
        headers: {
          'Authorization':'Bearer ' + sessionStorage.getItem('access_token'),
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
          'Authorization':'Bearer ' + sessionStorage.getItem('access_token'),
          'Content-Type': 'image/jpeg',
        },
        body: uploadImage
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
        'Authorization':'Bearer ' + sessionStorage.getItem('access_token'),
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
  localStorage.removeItem('userID');
};

export {getSearchResults,  addTracksToPlaylist}