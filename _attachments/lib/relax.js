var Couch = {
	app: '_design/app'
	,
	base: 'http://localhost'
	,
	db: 'play'
	,
	list: 'ul'
	,
	view: 'all'
	,
	url: {
		db: `${Couch.base}/${Couch.db}`
		,
		list: `${Couch.url.app}/_list/${Couch.list}/${Couch.view}`
	}
}