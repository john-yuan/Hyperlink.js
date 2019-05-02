(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Hyperlink = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var readAsString = require('./readAsString');

/**
 * @class
 * @param {string} [url] The URL to parse.
 */
function Hyperlink(url) {
    /**
     * The whole URL.
     */
    this.href = '';

    /**
     * The origin of the URL. Something like `https://example.com`
     */
    this.origin = '';

    /**
     * The protocol of the URL. Something like `https:`
     */
    this.protocol = '';

    /**
     * The username of the URL.
     */
    this.username = '';

    /**
     * The password of the URL.
     */
    this.password = '';

    /**
     * The host of the URL. If the port is not empty, the host will contain the port. For example: `example.com:8080`
     */
    this.host = '';

    /**
     * The host name of the URL. Does not contain the port.
     */
    this.hostname = '';

    /**
     * The port of the URL.
     */
    this.port = '';

    /**
     * The path name of the URL.
     */
    this.pathname = '';

    /**
     * The query string of the URL. If it is not empty, it must start with `?`. For example: `?lang=javascript`
     */
    this.search = '';

    /**
     * The hash string of the URL. If it is not empty, it must start with `#`. For example: `#search-result`
     */
    this.hash = '';

    url = readAsString(url);

    if (url) {
        this.setHref(url);
    }
}

/**
 * Set new `href`. Call this method will upadte all the properties.
 *
 * @param {string} href The href to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setHref = function (href) {
    var arr = null;
    var tmp = null;
    var str = readAsString(href);
    var domain = null;
    var regProtocol = /^([a-z][a-z0-9\-\.\+]*:)?\/\//i;
    var regSearchAndHash = /(\?[^#]*)?(#.*)?$/;

    // Make sure that hre is string.
    href = str;

    // If the test passed, means that the href is absolute url.
    // 1. It may contain a protocol.
    // 2. It must has a host.
    // 3. It may contain username and password.
    // 4. It may contain port.
    if (regProtocol.test(str)) {
        this.protocol = RegExp.$1;

        // Remove protocol
        str = str.replace(regProtocol, '');
        arr = str.split('/');

        // Save the domain part.
        domain = arr[0];

        // Remove the domain part.
        arr.shift();
        str = '/' + arr.join('/');
        arr = null;

        if (domain.indexOf('@') > -1) {
            arr = domain.split('@');
            tmp = arr[0];
            domain = arr[1];
            arr = tmp.split(':');
            this.username = arr[0];
            this.password = arr[1] || '';
            arr = null;
            tmp = null;
        } else {
            this.username = '';
            this.password = '';
        }

        arr = domain.split(':');
        this.host = domain;
        this.hostname = arr[0];
        this.port = arr[1] || '';
        arr = null;
    } else {
        this.protocol = '';
        this.username = '';
        this.password = '';
        this.host = '';
        this.hostname = '';
        this.port = '';
    }

    this.pathname = str.replace(regSearchAndHash, '');

    if (regSearchAndHash.test(str)) {
        this.search = RegExp.$1;
        this.hash = RegExp.$2;
    } else {
        this.search = '';
        this.hash = '';
    }

    if (this.host) {
        this.origin = this.protocol + '//' + this.host;
    } else {
        this.origin = '';
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `protocol` of the url. Call this method will update `protocol`, `origin`, `href`.
 *
 * @param {string} protocol The protocol to set. Somthing like `https:`
 * @returns {ThisType}
 */
Hyperlink.prototype.setProtocol = function (protocol) {
    this.protocol = readAsString(protocol);

    if (this.host) {
        this.origin = this.protocol + '//' + this.host;
    } else {
        this.origin = '';
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `username` of the URL. Call this method will update `username`, `href`.
 *
 * @param {string} username The user name to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setUserName = function (username) {
    this.username = readAsString(username);
    this.href = this.toString();

    return this;
};

/**
 * Set the `password` of the URL. Call this method will update `password`, `href`.
 *
 * @param {string} password The user name to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setPassword = function (password) {
    this.password = readAsString(password);
    this.href = this.toString();

    return this;
};

/**
 * Set the `host` of the url. Call this method will upate `host`, `hostname`, `port`, `origin`, `href`.
 *
 * @param {string} host The host to set. Something like `example.com:8080`.
 * @returns {ThisType}
 */
Hyperlink.prototype.setHost = function (host) {
    var arr = null;

    this.host = readAsString(host);

    arr = this.host.split(':');

    this.hostname = arr[0];
    this.port = arr[1] || '';

    if (this.host) {
        this.origin = this.protocol + '//' + this.host;
    } else {
        this.origin = '';
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `hostname` of the url. Call this method will update `hostname`, `host`, `origin`, `href`.
 *
 * @param {string} hostname The host name to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setHostName = function (hostname) {
    this.hostname = readAsString(hostname);

    if (this.port) {
        this.host = this.hostname + ':' + this.port;
    } else {
        this.host = this.hostname;
    }

    if (this.host) {
        this.origin = this.protocol + '//' + this.host;
    } else {
        this.origin = '';
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `port` of the url. Call this method will update `port`, `host`, `origin`, `href`.
 *
 * @param {string} port The port to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setPort = function (port) {
    this.port = readAsString(port);

    if (this.hostname) {
        if (this.port) {
            this.host = this.hostname + ':' + this.port;
        } else {
            this.host = this.hostname;
        }

        if (this.host) {
            this.origin = this.protocol + '//' + this.host;
        } else {
            this.origin = '';
        }
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `pathname` of the URL. Call this method will update `pathname`, `href`.
 *
 * @param {string} pathname The path name to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setPathName = function (pathname) {
    this.pathname = readAsString(pathname);
    this.href = this.toString();

    return this;
};

/**
 * Set the `search` of the URL. Call this method will update `search`, `href`.
 *
 * @param {string} search The search string to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setSearch = function (search) {
    this.search = readAsString(search);
    this.href = this.toString();

    return this;
};

/**
 * Set the `hash` of the URL. Call this method will update `hash`, `href`.
 *
 * @param {string} hash The hash string to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setHash = function (hash) {
    this.hash = readAsString(hash);
    this.href = this.toString();

    return this;
};

/**
 * Get the whole URL.
 *
 * @returns {string} Returns the whole URL.
 */
Hyperlink.prototype.toString = function () {
    var str = '';

    if (this.host) {
        if (this.username) {
            str = this.username;
        }
        if (this.password) {
            str = str + ':' + this.password;
        }
        if (str) {
            str += '@';
        }
        str = this.protocol + '//' + str + this.host;
    }

    return str + this.pathname + this.search + this.hash;
};

/**
 * Parse the given URL.
 *
 * @param {string} url The url to parse.
 * @returns {Hyperlink} Returns an instance of `Hyperlink`.
 */
Hyperlink.parse = function (url) {
    return new Hyperlink(url);
};

/**
 * @type {string} The version.
 */
Hyperlink.version = '0.0.2';

module.exports = Hyperlink;

},{"./readAsString":2}],2:[function(require,module,exports){
/**
 * The function to convert variable to string.
 *
 * @param {any} str The variable that need to be read as string. If it is `null` or `undefined`, it will be converted to
 * empty string. If is not string, it will be converted to string.
 *
 * @returns {string}
 */
function readAsString(str) {
    if (str === null || str === undefined) {
        str = '';
    } else {
        str = '' + str;
    }
    return str;
}

module.exports = readAsString;

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9IeXBlcmxpbmsuanMiLCJsaWIvcmVhZEFzU3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgcmVhZEFzU3RyaW5nID0gcmVxdWlyZSgnLi9yZWFkQXNTdHJpbmcnKTtcblxuLyoqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdXJsXSBUaGUgVVJMIHRvIHBhcnNlLlxuICovXG5mdW5jdGlvbiBIeXBlcmxpbmsodXJsKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHdob2xlIFVSTC5cbiAgICAgKi9cbiAgICB0aGlzLmhyZWYgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBvcmlnaW4gb2YgdGhlIFVSTC4gU29tZXRoaW5nIGxpa2UgYGh0dHBzOi8vZXhhbXBsZS5jb21gXG4gICAgICovXG4gICAgdGhpcy5vcmlnaW4gPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwcm90b2NvbCBvZiB0aGUgVVJMLiBTb21ldGhpbmcgbGlrZSBgaHR0cHM6YFxuICAgICAqL1xuICAgIHRoaXMucHJvdG9jb2wgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSB1c2VybmFtZSBvZiB0aGUgVVJMLlxuICAgICAqL1xuICAgIHRoaXMudXNlcm5hbWUgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwYXNzd29yZCBvZiB0aGUgVVJMLlxuICAgICAqL1xuICAgIHRoaXMucGFzc3dvcmQgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBob3N0IG9mIHRoZSBVUkwuIElmIHRoZSBwb3J0IGlzIG5vdCBlbXB0eSwgdGhlIGhvc3Qgd2lsbCBjb250YWluIHRoZSBwb3J0LiBGb3IgZXhhbXBsZTogYGV4YW1wbGUuY29tOjgwODBgXG4gICAgICovXG4gICAgdGhpcy5ob3N0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaG9zdCBuYW1lIG9mIHRoZSBVUkwuIERvZXMgbm90IGNvbnRhaW4gdGhlIHBvcnQuXG4gICAgICovXG4gICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHBvcnQgb2YgdGhlIFVSTC5cbiAgICAgKi9cbiAgICB0aGlzLnBvcnQgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwYXRoIG5hbWUgb2YgdGhlIFVSTC5cbiAgICAgKi9cbiAgICB0aGlzLnBhdGhuYW1lID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcXVlcnkgc3RyaW5nIG9mIHRoZSBVUkwuIElmIGl0IGlzIG5vdCBlbXB0eSwgaXQgbXVzdCBzdGFydCB3aXRoIGA/YC4gRm9yIGV4YW1wbGU6IGA/bGFuZz1qYXZhc2NyaXB0YFxuICAgICAqL1xuICAgIHRoaXMuc2VhcmNoID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaGFzaCBzdHJpbmcgb2YgdGhlIFVSTC4gSWYgaXQgaXMgbm90IGVtcHR5LCBpdCBtdXN0IHN0YXJ0IHdpdGggYCNgLiBGb3IgZXhhbXBsZTogYCNzZWFyY2gtcmVzdWx0YFxuICAgICAqL1xuICAgIHRoaXMuaGFzaCA9ICcnO1xuXG4gICAgdXJsID0gcmVhZEFzU3RyaW5nKHVybCk7XG5cbiAgICBpZiAodXJsKSB7XG4gICAgICAgIHRoaXMuc2V0SHJlZih1cmwpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBTZXQgbmV3IGBocmVmYC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwYWR0ZSBhbGwgdGhlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWYgVGhlIGhyZWYgdG8gc2V0LlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldEhyZWYgPSBmdW5jdGlvbiAoaHJlZikge1xuICAgIHZhciBhcnIgPSBudWxsO1xuICAgIHZhciB0bXAgPSBudWxsO1xuICAgIHZhciBzdHIgPSByZWFkQXNTdHJpbmcoaHJlZik7XG4gICAgdmFyIGRvbWFpbiA9IG51bGw7XG4gICAgdmFyIHJlZ1Byb3RvY29sID0gL14oW2Etel1bYS16MC05XFwtXFwuXFwrXSo6KT9cXC9cXC8vaTtcbiAgICB2YXIgcmVnU2VhcmNoQW5kSGFzaCA9IC8oXFw/W14jXSopPygjLiopPyQvO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoYXQgaHJlIGlzIHN0cmluZy5cbiAgICBocmVmID0gc3RyO1xuXG4gICAgLy8gSWYgdGhlIHRlc3QgcGFzc2VkLCBtZWFucyB0aGF0IHRoZSBocmVmIGlzIGFic29sdXRlIHVybC5cbiAgICAvLyAxLiBJdCBtYXkgY29udGFpbiBhIHByb3RvY29sLlxuICAgIC8vIDIuIEl0IG11c3QgaGFzIGEgaG9zdC5cbiAgICAvLyAzLiBJdCBtYXkgY29udGFpbiB1c2VybmFtZSBhbmQgcGFzc3dvcmQuXG4gICAgLy8gNC4gSXQgbWF5IGNvbnRhaW4gcG9ydC5cbiAgICBpZiAocmVnUHJvdG9jb2wudGVzdChzdHIpKSB7XG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSBSZWdFeHAuJDE7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHByb3RvY29sXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHJlZ1Byb3RvY29sLCAnJyk7XG4gICAgICAgIGFyciA9IHN0ci5zcGxpdCgnLycpO1xuXG4gICAgICAgIC8vIFNhdmUgdGhlIGRvbWFpbiBwYXJ0LlxuICAgICAgICBkb21haW4gPSBhcnJbMF07XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBkb21haW4gcGFydC5cbiAgICAgICAgYXJyLnNoaWZ0KCk7XG4gICAgICAgIHN0ciA9ICcvJyArIGFyci5qb2luKCcvJyk7XG4gICAgICAgIGFyciA9IG51bGw7XG5cbiAgICAgICAgaWYgKGRvbWFpbi5pbmRleE9mKCdAJykgPiAtMSkge1xuICAgICAgICAgICAgYXJyID0gZG9tYWluLnNwbGl0KCdAJyk7XG4gICAgICAgICAgICB0bXAgPSBhcnJbMF07XG4gICAgICAgICAgICBkb21haW4gPSBhcnJbMV07XG4gICAgICAgICAgICBhcnIgPSB0bXAuc3BsaXQoJzonKTtcbiAgICAgICAgICAgIHRoaXMudXNlcm5hbWUgPSBhcnJbMF07XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gYXJyWzFdIHx8ICcnO1xuICAgICAgICAgICAgYXJyID0gbnVsbDtcbiAgICAgICAgICAgIHRtcCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVzZXJuYW1lID0gJyc7XG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBhcnIgPSBkb21haW4uc3BsaXQoJzonKTtcbiAgICAgICAgdGhpcy5ob3N0ID0gZG9tYWluO1xuICAgICAgICB0aGlzLmhvc3RuYW1lID0gYXJyWzBdO1xuICAgICAgICB0aGlzLnBvcnQgPSBhcnJbMV0gfHwgJyc7XG4gICAgICAgIGFyciA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm90b2NvbCA9ICcnO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gJyc7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSAnJztcbiAgICAgICAgdGhpcy5ob3N0ID0gJyc7XG4gICAgICAgIHRoaXMuaG9zdG5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5wb3J0ID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5wYXRobmFtZSA9IHN0ci5yZXBsYWNlKHJlZ1NlYXJjaEFuZEhhc2gsICcnKTtcblxuICAgIGlmIChyZWdTZWFyY2hBbmRIYXNoLnRlc3Qoc3RyKSkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IFJlZ0V4cC4kMTtcbiAgICAgICAgdGhpcy5oYXNoID0gUmVnRXhwLiQyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgICAgIHRoaXMuaGFzaCA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3QpIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnByb3RvY29sICsgJy8vJyArIHRoaXMuaG9zdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9yaWdpbiA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGBwcm90b2NvbGAgb2YgdGhlIHVybC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSBgcHJvdG9jb2xgLCBgb3JpZ2luYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm90b2NvbCBUaGUgcHJvdG9jb2wgdG8gc2V0LiBTb210aGluZyBsaWtlIGBodHRwczpgXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0UHJvdG9jb2wgPSBmdW5jdGlvbiAocHJvdG9jb2wpIHtcbiAgICB0aGlzLnByb3RvY29sID0gcmVhZEFzU3RyaW5nKHByb3RvY29sKTtcblxuICAgIGlmICh0aGlzLmhvc3QpIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnByb3RvY29sICsgJy8vJyArIHRoaXMuaG9zdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9yaWdpbiA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGB1c2VybmFtZWAgb2YgdGhlIFVSTC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSBgdXNlcm5hbWVgLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVzZXJuYW1lIFRoZSB1c2VyIG5hbWUgdG8gc2V0LlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldFVzZXJOYW1lID0gZnVuY3Rpb24gKHVzZXJuYW1lKSB7XG4gICAgdGhpcy51c2VybmFtZSA9IHJlYWRBc1N0cmluZyh1c2VybmFtZSk7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYHBhc3N3b3JkYCBvZiB0aGUgVVJMLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIGBwYXNzd29yZGAsIGBocmVmYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFzc3dvcmQgVGhlIHVzZXIgbmFtZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0UGFzc3dvcmQgPSBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICB0aGlzLnBhc3N3b3JkID0gcmVhZEFzU3RyaW5nKHBhc3N3b3JkKTtcbiAgICB0aGlzLmhyZWYgPSB0aGlzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgaG9zdGAgb2YgdGhlIHVybC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwYXRlIGBob3N0YCwgYGhvc3RuYW1lYCwgYHBvcnRgLCBgb3JpZ2luYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBob3N0IFRoZSBob3N0IHRvIHNldC4gU29tZXRoaW5nIGxpa2UgYGV4YW1wbGUuY29tOjgwODBgLlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldEhvc3QgPSBmdW5jdGlvbiAoaG9zdCkge1xuICAgIHZhciBhcnIgPSBudWxsO1xuXG4gICAgdGhpcy5ob3N0ID0gcmVhZEFzU3RyaW5nKGhvc3QpO1xuXG4gICAgYXJyID0gdGhpcy5ob3N0LnNwbGl0KCc6Jyk7XG5cbiAgICB0aGlzLmhvc3RuYW1lID0gYXJyWzBdO1xuICAgIHRoaXMucG9ydCA9IGFyclsxXSB8fCAnJztcblxuICAgIGlmICh0aGlzLmhvc3QpIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnByb3RvY29sICsgJy8vJyArIHRoaXMuaG9zdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9yaWdpbiA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGBob3N0bmFtZWAgb2YgdGhlIHVybC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSBgaG9zdG5hbWVgLCBgaG9zdGAsIGBvcmlnaW5gLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhvc3RuYW1lIFRoZSBob3N0IG5hbWUgdG8gc2V0LlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldEhvc3ROYW1lID0gZnVuY3Rpb24gKGhvc3RuYW1lKSB7XG4gICAgdGhpcy5ob3N0bmFtZSA9IHJlYWRBc1N0cmluZyhob3N0bmFtZSk7XG5cbiAgICBpZiAodGhpcy5wb3J0KSB7XG4gICAgICAgIHRoaXMuaG9zdCA9IHRoaXMuaG9zdG5hbWUgKyAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gdGhpcy5ob3N0bmFtZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ob3N0KSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy5wcm90b2NvbCArICcvLycgKyB0aGlzLmhvc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLmhyZWYgPSB0aGlzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgcG9ydGAgb2YgdGhlIHVybC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSBgcG9ydGAsIGBob3N0YCwgYG9yaWdpbmAsIGBocmVmYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcG9ydCBUaGUgcG9ydCB0byBzZXQuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0UG9ydCA9IGZ1bmN0aW9uIChwb3J0KSB7XG4gICAgdGhpcy5wb3J0ID0gcmVhZEFzU3RyaW5nKHBvcnQpO1xuXG4gICAgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgICAgICAgdGhpcy5ob3N0ID0gdGhpcy5ob3N0bmFtZSArICc6JyArIHRoaXMucG9ydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdCA9IHRoaXMuaG9zdG5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ob3N0KSB7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMucHJvdG9jb2wgKyAnLy8nICsgdGhpcy5ob3N0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW4gPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGBwYXRobmFtZWAgb2YgdGhlIFVSTC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSBgcGF0aG5hbWVgLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhuYW1lIFRoZSBwYXRoIG5hbWUgdG8gc2V0LlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldFBhdGhOYW1lID0gZnVuY3Rpb24gKHBhdGhuYW1lKSB7XG4gICAgdGhpcy5wYXRobmFtZSA9IHJlYWRBc1N0cmluZyhwYXRobmFtZSk7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYHNlYXJjaGAgb2YgdGhlIFVSTC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSBgc2VhcmNoYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2ggVGhlIHNlYXJjaCBzdHJpbmcgdG8gc2V0LlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldFNlYXJjaCA9IGZ1bmN0aW9uIChzZWFyY2gpIHtcbiAgICB0aGlzLnNlYXJjaCA9IHJlYWRBc1N0cmluZyhzZWFyY2gpO1xuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGBoYXNoYCBvZiB0aGUgVVJMLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIGBoYXNoYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoIFRoZSBoYXNoIHN0cmluZyB0byBzZXQuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0SGFzaCA9IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgdGhpcy5oYXNoID0gcmVhZEFzU3RyaW5nKGhhc2gpO1xuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIHdob2xlIFVSTC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSB3aG9sZSBVUkwuXG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgaWYgKHRoaXMuaG9zdCkge1xuICAgICAgICBpZiAodGhpcy51c2VybmFtZSkge1xuICAgICAgICAgICAgc3RyID0gdGhpcy51c2VybmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYXNzd29yZCkge1xuICAgICAgICAgICAgc3RyID0gc3RyICsgJzonICsgdGhpcy5wYXNzd29yZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyKSB7XG4gICAgICAgICAgICBzdHIgKz0gJ0AnO1xuICAgICAgICB9XG4gICAgICAgIHN0ciA9IHRoaXMucHJvdG9jb2wgKyAnLy8nICsgc3RyICsgdGhpcy5ob3N0O1xuICAgIH1cblxuICAgIHJldHVybiBzdHIgKyB0aGlzLnBhdGhuYW1lICsgdGhpcy5zZWFyY2ggKyB0aGlzLmhhc2g7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBVUkwuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgdXJsIHRvIHBhcnNlLlxuICogQHJldHVybnMge0h5cGVybGlua30gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBgSHlwZXJsaW5rYC5cbiAqL1xuSHlwZXJsaW5rLnBhcnNlID0gZnVuY3Rpb24gKHVybCkge1xuICAgIHJldHVybiBuZXcgSHlwZXJsaW5rKHVybCk7XG59O1xuXG4vKipcbiAqIEB0eXBlIHtzdHJpbmd9IFRoZSB2ZXJzaW9uLlxuICovXG5IeXBlcmxpbmsudmVyc2lvbiA9ICcwLjAuMic7XG5cbm1vZHVsZS5leHBvcnRzID0gSHlwZXJsaW5rO1xuIiwiLyoqXG4gKiBUaGUgZnVuY3Rpb24gdG8gY29udmVydCB2YXJpYWJsZSB0byBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHthbnl9IHN0ciBUaGUgdmFyaWFibGUgdGhhdCBuZWVkIHRvIGJlIHJlYWQgYXMgc3RyaW5nLiBJZiBpdCBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAsIGl0IHdpbGwgYmUgY29udmVydGVkIHRvXG4gKiBlbXB0eSBzdHJpbmcuIElmIGlzIG5vdCBzdHJpbmcsIGl0IHdpbGwgYmUgY29udmVydGVkIHRvIHN0cmluZy5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiByZWFkQXNTdHJpbmcoc3RyKSB7XG4gICAgaWYgKHN0ciA9PT0gbnVsbCB8fCBzdHIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHIgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSAnJyArIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFkQXNTdHJpbmc7XG4iXX0=
