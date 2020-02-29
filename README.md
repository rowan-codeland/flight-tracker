# Flight Tracker
This webapp is a live flight tracker for all flights in the world. Users can view flights based on the airline country of origin and filter by airborn only or airborn and grouded flights. Flight data is from the opensky network API and the map is Leaflet.

## UX

This webapp is built for aviation fans

The webapp font and colours are based on airport signage. The map colour is set to black to continue this theme as within the view port there is healthy ratio of both colours.
The wewebappbsite font is helvetica with a backup of arial, these fonts are used on airport signage and arial is the modern standard in air traffic control towers

- As a webapp user, I want to view flights that are only airborne, so that I can see what flights are in the sky
- As a webapp user, I want to view flights based on country of origin, so that I can see flights based on my geographic interests.
- As a webapp user, I want to see updated flight co-ordinates, so that I can track the flightpath
- As a webapp user, I want to view airplane callsigns, so that I can further research flights I find on the map
- As a webapp user, I want to view aircraft speed, so that I can compare aircraft speeds


## Features
There are 4 main features on this web application. Country of origin filter, airborn filter, the map, marker popups (within the map).
 
### Existing Features
- The country of origin filter allows users to view flights based on the aircrafts country of origin. I.e. Ryanair & Aer Lingus contained within Ireland.
- The airborn filter allows users to view flights that are only airborn (using the yes checkbox(automatically preseelected)) or else view a combination of flights that are airborn and on the ground (using the no checkbox) Please note that some aircraft delay in reporting this status to OpenSky Network sensors.
- The map uses leaflet - a javscript library for mobile responsive maps. It also uses a custom tile layer to acheive the black view.
- Map markers. Once pressed the map markers display each flights callsign and speed.

### Features Left to Implement
- Given more time I would add another api to retreive flight data based on callsigns this would allow me to acheive the following;
- - Display departute airport
- - Display destination airport
- - Add fight paths
- - Show aircraft type
- - Show airline

- User location. A feature that queries the user location and shows flights overhead.

## Technologies Used

This webapp uses the following technologies;

- HTML5
- CSS3
- Javascript
- Leaflet
- The OpenSky Network API


## Testing
The website was testeD across Google Chome, Safari, Modzilla Firefox and Opera (using dev tools) It was not tested on Edge however it will work on Microsofts newest version of the browser after it's switch to Chromium.
The website was tested mobile first. Starting at the most popular and working it's way throug screen ratios as follows;

1. 16:9 (Standard iPhone 8, iPad onePlus, HTC, etc.)
2. 19.5:9 (iPHONE X and other edge to edge smartphone displays)
3. 18.5:9 (Samsung Galaxy)
4. 18:9 (LG, Xiaomi)
5. 3:2 (Macbook Air, Microsoft & Google Laptops)
6. 8:5 (Macbook Pro)

###Feature Testing

1. Country of origin filter
    1. Wait for countries to load
    2. Select country (test use case is Ireland)
    3. Check map markers against commercial flight tracker (test use FLIGHTRADAR 24)

2. Airborn Filter
    1. Select 'no'
    2. Wait for map refresh
    3. Check if new markers appended.
    4. Select 'yes' 
    5. Wait for map refresh
    6. Check if new markers from step 3 are removed.

3. Map
    1. Check map markers against commercial flight tracker (test use FLIGHTRADAR 24)
    2. Check map zoom in within set constraint
    3. Check map zoom out within set constraint

4. Marker popups
    1. Press on map marker (if on mobile; tap)
    2. Check that Callsign and speed match commercial flight tracker (FLIGHTRADAR 24)


## Deployment

The site is deployed live from the master branch to github pages and accesible [here](https://rowancopeland.github.io/patrick-bateman/)

## Credits

### OpenMap Tiles
- CartoDB Designed the map tiles used in this project called "Dark Matter with Labels"

