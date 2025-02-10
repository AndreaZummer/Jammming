# Jammming

![jammming landing page](.\screenshots\Screenshotjammming.jpg?raw=true)
![jammming search](.\screenshots\jammming-search.jpg?raw=true)
![jammming adding playlist cover](.\screenshots\jammming-adding-playlist.jpg?raw=true)
![jammming adding playlist to Spotify](.\screenshots\jammming.jpg?raw=true)

Jammming is a React SPA for creating custom playlists.
This project was created using the React framework. It is a single-page application(SPA) 
and a good example of using React. It contains React function components, states and hooks. 
It makes GET, PUT and POST HTTPS requests to the Spotify Web API using the OAuth 2.0 authorization framework. 
It allows usres to search for a track on Spotify 
and make custom playlists of their choice. Each playlist can have a cover image, which is uploaded and saved to the user's Spotify account. 
To use this application, users must have Spotify account and be logged in.
If they are not, application will prompt them to do so. Authorization requires an access token, provided by Spotify, which has one-hour expiration time. After that, new request for access token is made and the application is refreshed.

## Features included

You can search for a track by typing song title or artiist's name into the search box. 
20 most relevant results will be displayed in a list with ability to add them to custom playlist.
New created playlist can get name of your choice, if none is provided, default name is "New playlist". 
Jammming also provides a possibility to add a custom playlist cover image. Uploaded image must meet the required format and size restrictions.
This playlist is send to Spotify, where users can listen to songs they have chosen. 

## Technologies

This SPA was created using React 19.0.0 and it calls to Spotify Web API. For authorization was used OAuth Implicit Grant Flow. 
