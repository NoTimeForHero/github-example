const cors_proxy = require('cors-anywhere');
const commandLineArgs = require('command-line-args');

const args = commandLineArgs([
    {name: 'host', alias: 'h', type: String, defaultValue: '127.0.0.1'},
    {name: 'port', alias: 'p', type: String, defaultValue: '8080'}
])

const { host, port } = args;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: [],
    removeHeaders: []
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
