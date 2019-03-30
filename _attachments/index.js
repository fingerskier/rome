var $db
var baseURL
var data
var databases
var docs
var resource = {}

$(function(){
	documents = $('#documents')
	databases = $('#databases')

	$.couch.login({name:'play',password:'play'})
	.then(function(){
	})
		console.log('authenticated')

		$db = $.couch.db('play')

		docs = $db.list('app/ul','all')

		documents.load('http://localhost/rome/_design/app/_list/ul/all')
})

window.onhashchange = function processHash(){
	var asdf = location.hash.split('|')

	var url = asdf[1]
	var container = asdf[2]

	console.log(`${url} >> ${container}`)

	$(container).load(url)
}
