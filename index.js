var fs = require('fs')
var path = require('path')
var hstream  = require('hyperstream')
var createElement = require('virtual-dom/create-element')
var str = require('string-to-stream')

module.exports = function (opts) {
    opts = opts || {}
    opts.directory = opts.directory || './'
console.log(opts.directory)    
    return function (templates, pagevars, response) {
    looptemplates(templates)
        .pipe(hstream(procpagevars(pagevars)))
        .pipe(response)
    }

    function looptemplates (templates) {
        var start = templates.reverse().shift()
        return templates.reduce(function(prev, next) {
            return vdorfile(next).pipe(hstream({'.template': prev}))
        }, vdorfile(start))
    }

    function procpagevars (pagevars) {
        pagevars = pagevars || {}
        Object.keys(pagevars).forEach(function (key) {
            pagevars[key] = pagevars[key]
                ? (
                    /string|number|object/.test(typeof pagevars[key])
                        ? pagevars[key]: createElement(pagevars[key]).toString()
                )
                : ''
        })
        return pagevars
    }

    function vdorfile (template) {
        return 'string' === typeof template? read(template): str(createElement(template).toString())
    }

    function read (file) {
        return fs.createReadStream(path.join(opts.directory, file))
    }
}

