function a(href, text){
    var href = href || ''
    var text = text || ''

    return `<a href="${href}">${text}<\a>`
}

function parseChildren(){
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    var result = ''

    for (var X of args) {
        if ($.isFunction(X)){
            result += X()
        } else if ($.isArray(X)) {
            for(var Y of X){
                result += parseChildren(Y)
            }
        } else if ($.isPlainObject(X)) {
            let O = (X.length === 1 ? [O[0]] : Array.apply(null, X))
            for(var Y of X){
                result += parseChildren(Y)
            }            
        } else if (X.toString) {
            result += X.toString()
        } else {
            result += X
        }
    }

    return result
}

function hr(){
    return '<hr/>'
}

function nav(){
    return `<nav>${parseChildren(arguments)}</nav>`
}
