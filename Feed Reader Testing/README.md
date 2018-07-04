# Feed Reader Testing

A simple "Test Driven" (TDD) app that reads and checks RSS feed and make sures the feed is loading the content properly.

## How to run?

* Clone or download this repo.
* Navigate into the folder and open Index.html

## Expectations

* A test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
* A test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.
* A new test suite named `"The menu"`.
* A test that ensures the menu element is hidden by default. 
* A test that ensures the menu changes visibility when the menu icon is clicked. This test have two expectations, one for visibility and other for hiding the menu.
* A test suite named `"Initial Entries"`.
* A test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
* A test suite named `"New Feed Selection"`.
* A test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.

## Technologies Used

* HTML
* CSS
* JS
* jQuery
* Jasmine