// Request for Access Token using Implicit Grant Flow

async function getAccessToken() {
  let stateKey = 'spotify_auth_state';

  function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
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
    const scope = 'playlist-modify-private';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
  }
  requestForToken();
};
// Checks if user is logged in

async function logginChecker() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");

  if (!accessToken) {
      await getAccessToken();
  }; 

  return accessToken;
};

async function getProfile() {
  const accessToken = await logginChecker();
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  
  const data = await response.json();
  return data.id;
};

async function getSearchResults(searchedText) {
  const url='https://api.spotify.com/v1/search?q='+searchedText+'&type=track&market=SK&limit=20';
  const accessToken = await logginChecker();

  try {
    const response = await fetch(url,{
      headers: {
        'Authorization': 'Bearer '+ accessToken,
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
  const accessToken = await logginChecker();
  const userID = await getProfile();
 
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method:'POST',
        headers: {
          'Authorization':'Bearer ' + accessToken,
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
    return playlistID;
  }
  catch(error) {
    console.log("Error adding to Spotify:", error);
  };
};

async function addTracksToPlaylist(uriList,playlistName) {
  const accessToken= await logginChecker();
  const userID = await getProfile(accessToken);
  const playlistID= await addPlaylistToSpotify(playlistName);

  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      method:'POST',
      headers: {
        'Authorization':'Bearer ' + accessToken,
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
    const body = await response.json();
  }
  catch(error) {
    console.log("Error adding to Spotify:", error);
  };
};

export {getSearchResults, addTracksToPlaylist, getProfile, addPlaylistToSpotify};
