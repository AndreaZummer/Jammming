# Jammming

![jammming landing page](https://github.com/AndreaZummer/Jammming/blob/691a4935a94153ff1d3c2a948280dc2a412d8141/screenshots/Landing-page.png)
![jammming searchbar](https://github.com/AndreaZummer/Jammming/blob/691a4935a94153ff1d3c2a948280dc2a412d8141/screenshots/Searchbar.png)
![jammming autosuggestions](https://github.com/AndreaZummer/Jammming/blob/691a4935a94153ff1d3c2a948280dc2a412d8141/screenshots/Suggestions.png)
![jammming search results](https://github.com/AndreaZummer/Jammming/blob/691a4935a94153ff1d3c2a948280dc2a412d8141/screenshots/More-options.png)
![jammming adding playlist cover](https://github.com/AndreaZummer/Jammming/blob/691a4935a94153ff1d3c2a948280dc2a412d8141/screenshots/Cover.png)
![jammming adding playlist to Spotify](https://github.com/AndreaZummer/Jammming/blob/691a4935a94153ff1d3c2a948280dc2a412d8141/screenshots/Success.png)

Jammming is a React SPA for creating custom playlists.
This project was created using the React framework. It is a single-page application(SPA) 
and a good example of using React. It contains React function components, states and hooks. 
It makes GET, PUT and POST HTTPS requests to the Spotify Web API using the OAuth Authorization code with PKCE extension.  
It allows usres to search for a track on Spotify by typing title or artist. Some autosuggestions are provided based on user's input. User can choose tracks and create custom playlists of their choice. Each playlist can have a cover image, which is uploaded and saved to the user's Spotify account. 
To use this application, users must have Spotify account and be logged in.
If they are not, application will prompt them to do so. Authorization requires an access token, provided by Spotify, which has one-hour expiration time. After that, new request for access token is made and the application is refreshed.

## Features included

You can search for a track by typing song title or artiist's name into the search box. 
Some ot the most appropriate tracks suggestions are provided. The user can choose one of them or enter their own search query.
20 most relevant results will be displayed in a list with ability to add them to custom playlist.
New created playlist can get name of your choice, if none is provided, default name is "New playlist". 
Jammming also provides a possibility to add a custom playlist cover image. Uploaded image must meet the required format and size restrictions.
This playlist is send to Spotify, where users can listen to songs they have chosen. 

## Technologies

This SPA was created using React 19.0.0 and it calls to Spotify Web API. For authorization was used OAuth Authorization code with PKCE extension. 

## Tests

SPA was tested using Vitest together with React Testing Library and Jest Testing Library. 