# Deprecated

**This module is deprecated! Please use [HyperlinkParser.js](https://www.npmjs.com/package/hyperlink-parser) instead!**

# Hyperlink.js

[![npm version](https://img.shields.io/npm/v/x-hyperlink.svg)](https://www.npmjs.com/package/x-hyperlink)
[![Build Status](https://travis-ci.org/john-yuan/Hyperlink.js.svg?branch=master)](https://travis-ci.org/john-yuan/Hyperlink.js)
[![install size](https://packagephobia.now.sh/badge?p=x-hyperlink)](https://packagephobia.now.sh/result?p=x-hyperlink)
[![npm downloads](https://img.shields.io/npm/dm/x-hyperlink.svg)](http://npm-stat.com/charts.html?package=x-hyperlink)

Hyperlink.js is an util to parse URL. Can be used in Node.js and browsers. For details, see the
example in the following section.

## Installation

```sh
npm i x-hyperlink
```

## Example

```js
// `Hyperlink` is a constructor.
var Hyperlink = require('x-hyperlink');

// The url for testing.
var url = 'https://user:pass@example.com:8080/search?q=javascript#results';

/**
 * @type {Hyperlink}
 */
var link = Hyperlink.parse(url);

// Or you can use the constructor directly:
// var link = new Hyperlink(url);
```

The `link` is an instance of `Hyperlink` which holds the following informations:

```json
{
    "href": "https://user:pass@example.com:8080/search?q=javascript#results",
    "origin": "https://example.com:8080",
    "protocol": "https:",
    "username": "user",
    "password": "pass",
    "host": "example.com:8080",
    "hostname": "example.com",
    "port": "8080",
    "pathname": "/search",
    "search": "?q=javascript",
    "hash": "#results"
}
```

## API

Do not modify the properties of the Hyperlink instance directly, because some property has dependency
on other properties. The best way to update the property is use the setter methods, which will handle
the dependencies among them. All available methods are listed as follow:

* Hyperlink.parse(url)
* Hyperlink.prototype.setHref(href)
* Hyperlink.prototype.setProtocol(protocol)
* Hyperlink.prototype.setUserName(username)
* Hyperlink.prototype.setPassword(password)
* Hyperlink.prototype.setHost(host)
* Hyperlink.prototype.setHostName(hostname)
* Hyperlink.prototype.setPort(port)
* Hyperlink.prototype.setPathName(pathname)
* Hyperlink.prototype.setSearch(search)
* Hyperlink.prototype.setHash(hash)
* Hyperlink.prototype.toString()

As you can see, there is no setter method to modify the `origin` property. If you want to modify the
`origin` property, call `setProtocol(protocol)` and `setHost(host)`.

## Dev commands

```sh
# Start local server and compiler
npm run dev

# Build the release bundle
npm run build
```

## Links

* [HTMLHyperlinkElementUtils - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils)

## License

[MIT](./LICENSE "MIT")
