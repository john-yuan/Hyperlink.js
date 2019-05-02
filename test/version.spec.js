var fs = require('fs');
var path = require('path');
var assert = require('assert');
var Hyperlink = require('../lib/Hyperlink');

describe('version', function () {
    it('version is ' + Hyperlink.version, function () {
        var addr = path.resolve(__dirname, '../package.json');
        var json = fs.readFileSync(addr).toString();
        var data = JSON.parse(json);

        assert.deepStrictEqual(Hyperlink.version, data.version);
    });
});
