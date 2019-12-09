[![Build Status](https://travis-ci.org/cccdf/snkrs-frontend.svg?branch=master)](https://travis-ci.org/cccdf/snkrs-frontend)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment

Surge link:  picayune-egg.surge.sh

## For the other related repositories(scrapy crawler, backend)

1. [Frontend project](https://github.com/cccdf/snkrs-frontend)
2. [Backend project](https://github.com/cccdf/snkr-api)
3. [Scrapy crawler](https://github.com/cccdf/sneaker-spider)

## Total architecture

1. Python scrapy crawler collect data from official website. Save as json file.
2. import data to the mongodb atlas
3. use nodejs express to connect mongodb atlas, write model, view, routes to generate an json api.
4. Build front end through react. Get data through json api provided by nodejs express and ajax.

## problems

### Database and express

1. build data model properly
2. connect database and express. Be careful about arguments, especially when copying command from mongodb. Remember to change the database name.
3. after build before surge, create a 200.html(content same as index.html) in build
4. db privacy
5. data model automatically add 's' to collection

### Front-end(React)

1. Router and switch can be placed in different file(render properly)
2. Make navbar listen to login status(jwt), use model events to add listener to navbar. When login successfully, emit a signal to navbar component.
