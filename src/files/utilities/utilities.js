var client_id = '32fd7115babc4ea9a080fde3bb3d88df';
var client_secret = '05962b9798b94e028f49913cae8c608b';

async function getAccessToken() {
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      'Content-Type': 'application/x-www-form-urlencoded', 
    },
    body: 'grant_type=client_credentials' 
  };
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      };
    const body = await  response.json();
    const token = body.access_token;
    return token;
  }
  catch(error) {
      console.log("Error fetching token:", error);
  };
};

async function getSearchResults(searchedText) {
  const url='https://api.spotify.com/v1/search?q='+searchedText+'&type=track&market=SK&limit=20';
  const token = await getAccessToken();

  try {
    const response = await fetch(url,{
      headers: {
        'Authorization': 'Bearer '+ token,
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
  };
};

async function addPlaylistToSpotify(playlistName) {
  const token= await getAccessToken();

  try {
    const response = await fetch('https://api.spotify.com/v1/users/32fd7115babc4ea9a080fde3bb3d88df/playlists', {
        method:'POST',
        headers: {
          'Authorization':'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
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
    console.log(playlistID);
    return playlistID;
  }
  catch(error) {
    console.log("Error adding to Spotify:", error);
  };
};

async function addTracksToPlaylist(uriList,playlistName) {
  const token= await getAccessToken();
  const playlistID= await addPlaylistToSpotify(playlistName, token);

  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method:'POST',
      headers: {
        'Authorization':'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: {
        "uris": uriList,
        "position": 0,
      }
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

export {getAccessToken, getSearchResults, addPlaylistToSpotify, addTracksToPlaylist};
