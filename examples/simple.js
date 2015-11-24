var templates = require('../')({directory: 'examples/public'})

templates(
    ['simple.html', 'message.html'],
    {'title': 'My New Title', '#message': 'Hello templateking!', '#datetime': Date()},
    process.stdout
)

