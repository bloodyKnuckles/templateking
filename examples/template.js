var templates = require('../')({directory: 'examples/public'})
var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/public')

http.createServer(function (request, response) {
    if ( request.url === '/' ) {
        var message = 'Hello template!'
        templates(
            ['main.html', 'message.html'],
            {'#message': message, '#datetime': Date()},
            response
        )
    }
    else { ecstatic(request, response) }
}).listen(8000)

