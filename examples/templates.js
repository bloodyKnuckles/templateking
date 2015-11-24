var templates = require('../')({directory: 'examples/public'})
var http = require('http')
var ecstatic = require('ecstatic')(__dirname + '/public')
var hscript = require('virtual-dom/h')

http.createServer(function (request, response) {
    if ( request.url === '/' ) {
        var message = 'Hello template!'
        templates(
            ['main.html', 'message.html'],
            {'#message': message, '#datetime': Date()},
            response
        )
    }
    else if ( request.url === '/welcome' ) {
        templates(
            ['main.html', hscript('span', 'Welcome!')],
            {},
            response
        )
    }
    else if ( request.url === '/section' ) {
        var message = 'Hello section!'
        templates(
            ['main.html', 'section.html', 'message.html'],
            {
                'head': {_mapappend: {
                    'link': [{'link':{href:'/css/section.css'}}]
                }},
                '#sectionheader': 'Section!', '#message': message, '#datetime': Date(),
                '#scripts': {_mapprepend: {
                    'script': [
                        {'script':{src:undefined, _html:'console.log("message loaded")'}},
                        {'script':{src:'/js/section.js'}}
                    ]
                }}
            },
            response
        )
    }
    else { ecstatic(request, response) }
}).listen(8000)

