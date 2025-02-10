// Request for Access Token using Implicit Grant Flow

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
};
// Checks if user is logged in

async function logginChecker() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");

  if (!accessToken) {
      await getAccessToken();
  }
  localStorage.setItem('access_token', accessToken)
  return accessToken
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

export {getSearchResults, addTracksToPlaylist, getProfile, addPlaylistToSpotify, expirationChecker};
