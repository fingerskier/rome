function _ajax_request(url, data, callback, method) {
	return jQuery.ajax({
		url: url,
		type: method,
		data: data,
		success: callback
	});
}

jQuery.extend({
	put: function(url, data, callback) {
		return _ajax_request(url, data, callback, 'PUT');
}});


jQuery.extend({
	delete: function(url, data, callback) {
		return _ajax_request(url, data, callback, 'DELETE');
}});
