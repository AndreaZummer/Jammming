import { getAccessTokenImplict } from "./login";

async function logginChecker() {
  const clientID = "32fd7115babc4ea9a080fde3bb3d88df";
  const redirect_uri = 'http://localhost:3000';
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
      await getAccessTokenImplict();
  } else {
      const accessToken = await getAccessToken(clientID, code);
      const profile = await getProfile(accessToken);
      // populateUI(profile);
  };

  async function getAccessToken(clientID, code) {
    const params = new URLSearchParams();
      params.append("client_id", clientID);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", redirect_uri);

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
      });

    const body = await response.json();
    console.log(body.access_token)
    return body.access_token;
  }
};
/*async function getAccessToken() {
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
      'Content-Type': 'application/x-www-form-urlencoded', 
    },
    body: 'grant_type=client_credentials' 
  };
  try {
    const scope = 'user-read-private user-read-email';
    const response = await fetch('https://accounts.spotify.com/api/token?scope=' + encodeURIComponent(scope), authOptions);
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
};*/

async function getProfile(token) {

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  const data = await response.json();
  console.log(data.user_id);
  return data;
};

async function getSearchResults(searchedText) {
  const url='https://api.spotify.com/v1/search?q='+searchedText+'&type=track&market=SK&limit=20';
  // const token = await getAccessToken();

  try {
    const response = await fetch(url,{
      headers: {
        // 'Authorization': 'Bearer '+ token,
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

async function addPlaylistToSpotify(playlistName,token, userID) {

  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
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
  const token= await getAccessTokenImplict();
  const userID = await getProfile(token);
  const playlistID= await addPlaylistToSpotify(playlistName, token, userID);

  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
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

export { getSearchResults, addPlaylistToSpotify, addTracksToPlaylist, getProfile};
