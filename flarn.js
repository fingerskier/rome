var couchapp = require('couchapp')
var path = require('path');

ddoc = {
	_id: '_design/flarn'
	,
	filters: {
		important(doc, req) {
			if (doc.priority == 'high') return true
			else return false
		}
	}
	,
	lists: {
		ul(head, req) {
			var baseURL = 'http://localhost/rome'

			start({
				headers: {"Content-type": "text/html"}
			});

			send("<ul>\n");

			while(row = getRow()) {
				send('\n<li>' + '<a class="docLink" href="' + baseURL + row.key + '">' + row.key + '</a>\n</li>');
			}

			send("</ul>\n")
		}
	}
	,
	views: {
		all: {
			map(doc){
				emit(doc._id)
			}
		}
		,
		tagged: {
			map: function(doc) {
				if(doc.tag && doc.tag.length && doc.value) {
					emit(doc._id);
				}
			}
		}
		,
		valued: {
			map: function(doc) {
				if (doc.value && (+doc.value > -1000)) emit(doc._id)
			}
		}
		,
		values: {
			map: function(doc) {
				if (doc.value && (+doc.value > -1000)) emit(doc.value)
			}
		}
	}
	,
	shows: {
		person(doc, req) {
			return {
				headers: {"Content-type": "text/html"},
				body: "<h1 id='person' class='name'>" + doc.name + "</h1>\n"
			}
		}
	}
	,
	validate_doc_update(newDoc, oldDoc, userCtx) {
		function require(field, message) {
			message = message || "Document must have a " + field;
			if (!newDoc[field]) throw({forbidden : message});
		};
		
		if (newDoc.type == "person") {
			require("name");
		}
	}
}

module.exports = ddoc;

couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'));


function docURL(id) {
	return `${baseURL}/${id}`
}
// var cmd = require('node-cmd')


// cmd.run('couchapp push dev')
