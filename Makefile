test:
	node_modules/.bin/mocha

browser-test:
	bin/test

build:
	bin/compile

.PHONY: test browser-test build
