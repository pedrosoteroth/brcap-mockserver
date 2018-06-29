var http = require('http');
var mockserver = require('mockserver');

console.log('Example mock is running at 9001');

http.createServer(mockserver('./_mocks')).listen(9001);