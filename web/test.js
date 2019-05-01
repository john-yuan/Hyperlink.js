/**
 * The function to print the log in the web page.
 *
 * @param {string} text The log text.
 * @param {string} [color] The color for the log text.
 */
var log = function (text, color) {
    var logs = document.getElementById('logs');
    var pre = document.createElement('pre');
    var code = document.createElement('code');
    var textNode = document.createTextNode(text);

    if (color) {
        code.style.color = color;
    }

    code.appendChild(textNode);
    pre.appendChild(code);
    logs.appendChild(pre);
};

/**
 * Test the Hyperlink with the given URL.
 *
 * @param {string} url The URL for testing. It muse be an abosolute URL with protocol.
 */
var testHyperlink = function (url) {
    var a = document.createElement('a');
    var info = Hyperlink.parse(url);
    var i;
    var key;
    var keys = [
        'href',
        'protocol',
        'username',
        'password',
        'host',
        'hostname',
        'port',
        'pathname',
        'search',
        'hash',
        'origin'
    ];

    a.href = url;

    log('---');
    log(' Test URL: ' + url);

    for (i = 0; i < keys.length; i += 1) {
        key = keys[i];
        if (a[key] !== info[key]) {
            log(' Test failed on key: ' + key, 'red');
            log(' Expected: ' + a[key], 'red');
            log(' Got: ' + info[key], 'red');
            alert(' Test failed on key: ' + key +
                    '\n Expected: ' + a[key] +
                    '\n Got: ' + info[key]);
        } else {
            log('  Passed: ' + key + ' ("'+ info[key] +'")');
        }
    }

};

testHyperlink('https://api.example.com:8080');
testHyperlink('https://api.example.com:8080/');
testHyperlink('https://api.example.com:8080/en-US/search');
testHyperlink('https://api.example.com:8080/en-US/search?q=URL');
testHyperlink('https://api.example.com:8080/en-US/search#search-results-close-container');
testHyperlink('https://api.example.com:8080/en-US/search?q=URL#search-results-close-container');
testHyperlink('https://user@api.example.com:8080/en-US/search?q=URL#search-results-close-container');
testHyperlink('https://user:pass@api.example.com:8080/en-US/search?q=URL#search-results-close-container');
testHyperlink('https://:pass@api.example.com:8080/en-US/search?q=URL#search-results-close-container');
