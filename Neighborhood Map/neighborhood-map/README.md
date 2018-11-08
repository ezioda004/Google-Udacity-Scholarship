# Neighborhood Maps

A Single Page App made by using create-react-app, Google Maps API and Foursquare API showcasing the neighbordhood has to offer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)
- [Live Preview](#livepreview)

## Installation

### Quick install
In your terminal write these commands in order:

```
git clone <url of this repo>
cd neighborhood-map
npm install (this may take few minutes)
npm start
```
  

## Usage

### Overview

As soon the app starts, it makes request to FourSquare API and fetches the locations details. The location is then rendered on the map. 

### Marker and InfoWindow

Clicking on the Marker open an InfoWindow, which animates and :

* Shows an image
* Name of the location
* Rating
* Address

### Menu and ListItem

Clicking on the Menu button (Hamburger icon) on top opens up the list of the location and a search bar.
Typing in the search bar filters the locations in real time.

Clicking on the location opens ups the InfoWindow. 

### ServiceWorker

The Application also uses ServiceWorker which works in the build mode only.
To test ServiceWorker, you must make a prdouction build first. 

### Build
In terminal type
```
npm run build (this may take some time)
serve -s build
```
After that head over to `localhost:5000` and ServiceWorker can be tested by audit tab in chrome dev tools.

### A11y and Responsiveness

The app is accessible with 95% score in lighthouse and responsive as well.


## Support

Please [open an issue](https://github.com/ezioda004/Google-Udacity-Scholarship/issues) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/ezioda004/Google-Udacity-Scholarship/pulls).

## Live Preview

The website is live at https://neighborhood-map-ezioda004.netlify.com