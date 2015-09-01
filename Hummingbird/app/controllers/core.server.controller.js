'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};

exports.getId = function() {
	var d = new Date().getTime();
	var id = 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, 
		function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c==='x' ? r : (r&0x7|0x8)).toString(16);
		});
	return id;
};