var client_id = '32fd7115babc4ea9a080fde3bb3d88df';
var client_secret = '05962b9798b94e028f49913cae8c608b';

function getAccessToken() {
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      'Content-Type': 'application/x-www-form-urlencoded', 
    },
    body: 'grant_type=client_credentials' 
  };

  fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(body => {
        const token = body.access_token;
        return token;
    })
      .catch(error => {
          console.error("Error fetching token:", error);
      })
};

function getSearchResults(searchedText,token) {
  const url=`https://api.spotify.com/v1/search?q=${searchedText}&type=track%2Cartist&market=SK&limit=20`;
  token = getAccessToken();

  fetch(url,{
    headers: {
      'Authorization': token,
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
      .then(body => {
        const tracklist = body.tracks;
        return tracklist;
      })
        .catch(error => {
          console.error("Error fetching results:", error);
        })
};

function addPlaylistToSpotify(playlistName, token) {
  token=getAccessToken();

  fetch('https://api.spotify.com/v1/users/32fd7115babc4ea9a080fde3bb3d88df/playlists', {
      method:'POST',
      headers: {
        'Authorization':'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: {
        "name": playlistName,
        "description": "Custom Playlist",
        "public": false
      }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error (`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
      .then(body => {
        const playlistID = body.id;
        return playlistID;
      })
        .catch(error => {
          console.error("Error adding playlist:", error);
        })
};

function addTracksToPlaylist(uriList,playlistName) {
  let token= getAccessToken();
  let playlistID=addPlaylistToSpotify(playlistName,token);

  fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
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
  .then(response => {
    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
};

export {getAccessToken, getSearchResults, addPlaylistToSpotify, addTracksToPlaylist};
