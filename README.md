# comma.ai-codingchallenge

The deployed site is [here](https://dashcamroutes.herokuapp.com/)


This app, if I interpreted the instructions correctly (see instructions), simultaneously shows all trips recorded on an interactive map and the distribution of their speeds. This distribution is presented by using different colors, for which a legend can be found in a sidenav.

Each trip is a ``json`` file with a start and end time. The ``json`` file also contains a ``coords`` array, which contains data points sampled every second during the trip. Each data point contains the coordinates and the speed at the time of sampling.

The dataset is large (~72Mb), so I decided to granulate it to make it more manageable. My thought process was to take data every n seconds for different datasets. I would then connect these points together to form a line. After later consideration (as I write this), I could have used the `dist` (distance) to separate the points, and connected every point that was greater than a certain distance apart (which I would have to test for on the map). I separated the data based on the zoom of
the map. My thought-process here was that at higher zooms (farther out), you need detail (more separation between points). At medium zoom, the data was less granulated, and the least granulated for the small-zoom dataset. The data was loaded into a Mongodb Atlas cluster. The datasets were split into three different collections.

The backend was built using a simple `express` app. The express app has three routes; one for each of the datasets. It is a pretty simple frontend with nothing that fancy. I wanted to do more data parsing on the server end, but the map package, `leaflet`, made this difficult as it requires the coordinates to be wrapped in a function that defines layers on top of the map, which is not available in the backend. One option that could have been worth looking more into was
`leaflet-headless` which seemed to get around the inability to use the package in the backend (it defines a "pseudo-window"), but as I have school I couldn't really look into it anymore.

The frontend was built in `angular`. Its breakdown is as follows:
- `AppModule` is the main module
  - imports the `RoutingModule` and `MaterialModule` which imports Angular Material Components
  - `AppComponent` that the app bootstraps to; it contains the route outlet where other routes are placed.
  - `MapComponent`, which contains the actual map and displays the data.
    - `leaflet` is the package used to create the interactive map.
In routing to the map component, data is prefetched before the component loads using a route resolver. This resolver uses another service, `TripsService`, to fetch the data, which acts as a global way to fetch data and change state depending on if data is being fetched or not. Data is parsed on the client side, which I wanted to change.

Client-side caching is implemented with an `HttpInterceptor`. When data is being fetched, it checks whether the data has already been recieved and stored in a cache. If it hasn't, the data is downloaded, but if it has, the data is simply taken from the cache.

The project was deployed on Heroku.

## What I would have improved with more time
- Server-side parsing; must be a way to do this to avoid parsing the data every time a request is made. If implemented, would probably try server-side caching.
- Better way to split the data, maybe considering using the `dist` value taken at each second of the trip. This is probably the biggest one.
- My method of splitting the data is very rudimentary, and it shows, being rough around the edges at times on the map.
- Only added points to the map that were within the bounds of the map on the page. Seems like `leaflet` does a good job of caching these points anyways though.
- e2e testing

Data and other scripts made can be found [here](https://github.com/Sammyalhashe/comma.ai-codingchallenge)
