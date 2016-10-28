To run, first run npm install, then node server.js

# TODO

1. When an entry is made in the search bar, and then the search bar is defocused, the prediction list stays visible. Add functionality to close the prediction list as well as the search bar when the screen is clicked

2. At the moment, the active prediction only changes when the prediction list is navigated with the keyboard. Add mouse functionality

3. The weather info scrunches up when the prediction list appears, because it calculates its height from whatever space is available on the page, and the list takes up some of that space

4. MEDIA QUERIES: Sort out reactive sizing for everything but in particular for the weather info and for the search bar/prediction list

5. Make all queries to Google API run on the server rather than client side, so that it's possible to use the site in China without a VPN. This is a bad solution though because it increases the server load a LOT

# NOTE

1. Changed file: node_modules/babel-core/lib/transformation/file/options/option-manager.js:353:53 by adding ` || ''` within the brackets. This was to fix the bug caused by running npm start with Node 6.0. Before the upgrade to Node 6.0, it worked fine.
