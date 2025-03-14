# Jammming

Welcome to Jammming!
Jammming is a React application that allows users to create custom playlists, which are then saved to their ![Static Badge](https://img.shields.io/badge/Spotify-green) account.

## What is ![Static Badge](https://img.shields.io/badge/Jammming-53cba1)?

Jammming is React single-page application(SPA). It allows users to create playlist with the name of their choice and add any number of songs. If they want, they can also add a custom playlist cover. Finally, playlist is saved to their ![Static Badge](https://img.shields.io/badge/Spotify-green) account.

## Technologies 

This project was built using:

- React
- ![Static Badge](https://img.shields.io/badge/Spotify-green) API
- the OAuth Authorization code with PKCE 

and tested using:

- Vitest
- React testing library
- Jest testing library
- User event testing library

## Usage

This section contains a detailed description of how the application works, along with a graphical representation.

1. **Loggin to Spotify**

![Static Badge](https://img.shields.io/badge/!Note-red) For using of this app you must have a ![Static Badge](https://img.shields.io/badge/Spotify-green) account.

Upon the first opening of the browser window, the user is prompted to log in to their Spotify account (if they are not already logged in).

![logging to Spotify](https://github.com/AndreaZummer/Jammming/blob/88eedbce28b668d387d3c23c9115ff9c82f9e598/screenshots/loggin.png)

2. **Authorization** 

After logging in authorization is required. The authorization process uses Authorization flow with PKCE. User must grant permission for the application to display their name, profile picture, number of followers and public playlists, as well as to make changes to their Spotify account, including uploading playlist cover images, create and modify private and public playlists. 

![authorization](https://github.com/AndreaZummer/Jammming/blob/88eedbce28b668d387d3c23c9115ff9c82f9e598/screenshots/authorization.png)

After successful authorization, user is redirected to the Jammming landing page. As a result of authorization user receives access token that is valid for 1 hour. After that, new request for access token is automatically made using the refresh token.

![jammming landing page](https://github.com/AndreaZummer/Jammming/blob/88eedbce28b668d387d3c23c9115ff9c82f9e598/screenshots/Landing-page.png)

3. **Creating playlist**

The landing page allows the user to create a playlist with any name.
If no name is provided, the default name will be 'New Playlist'.

![jammming creating playlist](https://github.com/AndreaZummer/Jammming/blob/f5f8dc030e91598002035236ec80e014ba3b5d9c/screenshots/creating-playlist.png)

4. **Searching for tracks**

After creating the playlist, the user can search for tracks by typing track's title or artist.

![jammming searchbar](https://github.com/AndreaZummer/Jammming/blob/691a4935a94153ff1d3c2a948280dc2a412d8141/screenshots/Searchbar.png)

After entering the first three letters, the most relevant suggestions will appear on the screen. The user can choose one of them or enter their own search query.

![jammming autosuggestions](https://github.com/AndreaZummer/Jammming/blob/73a51c8d2a6c0fdc65ef5fe46247792f0a942e22/screenshots/suggestions.png)

After search, twenty the most relevant results will be displayed in a Search Results section.

![jammming search results](https://github.com/AndreaZummer/Jammming/blob/f5f8dc030e91598002035236ec80e014ba3b5d9c/screenshots/First%20search.png)

5. **Adding tracks to Playlist**

The user can choose track they want to add to playlist and make so pressing the Add button. The playlist can contain any number of tracks.

![jammming playlist](https://github.com/AndreaZummer/Jammming/blob/507218ef3743615db70d1b508f11602bd4637eee/screenshots/playlist.png)

Clicking the Remove button on a track in the playlist will remove it from the playlist.
The user can also change the playlist name by clicking the More Options button.

![jammming more options](https://github.com/AndreaZummer/Jammming/blob/507218ef3743615db70d1b508f11602bd4637eee/screenshots/More-options.png)

![jammming rename playlist](https://github.com/AndreaZummer/Jammming/blob/507218ef3743615db70d1b508f11602bd4637eee/screenshots/Rename.png)

6. **Adding playlist cover image**

The user can choose to add a custom playlist cover image by clicking the More Options button and selecting the 'Add Cover Image' option. A file upload window will appear and the user can select a custom image.

![Static Badge](https://img.shields.io/badge/!Note-red) The uploaded image must be Jpeg format with max-size: 191KB. 

![jammming adding playlist cover](https://github.com/AndreaZummer/Jammming/blob/bc9d8d5daaacf7577479cb72d254780b15f16595/screenshots/Add-playlist-cover.png)

After a successful upload, a preview of the cover image is displayed next to the playlist name.

![jammming cover image accepted](https://github.com/AndreaZummer/Jammming/blob/507218ef3743615db70d1b508f11602bd4637eee/screenshots/Cover%20changed.png)

7. **Adding playlist to Spotify**

After clicking the 'Add to Spotify' button, the playlist is saved to user's Spotify account, and a success message is displayed.

![jammming adding to spotify](https://github.com/AndreaZummer/Jammming/blob/507218ef3743615db70d1b508f11602bd4637eee/screenshots/Success.png)

## Running Locally

![Static Badge](https://img.shields.io/badge/!Important%20Notice-red)

Despite installing the application, its use is only possible with the author's consent.

1. Clone the repository:

   ```sh
   git clone https://github.com/AndreaZummer/Jammming.git
    cd jammming
   ```

2. Install the required dependencies:

   ```sh
   npm install
   ```

3. Launch the development server:

   ```sh
   npm run start
   ```