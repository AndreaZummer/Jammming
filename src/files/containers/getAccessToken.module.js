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
    })
      .catch(error => {
          console.error("Error fetching token:", error);
      })
};
  export {getAccessToken};
