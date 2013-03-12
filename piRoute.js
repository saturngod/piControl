var url = require('url');
var fs = require("fs");

var req , res;

function routing(address,callback)
{
	var url_parts = url.parse(req.url); 
	var current_url=url_parts.pathname;
	
	if(current_url == address)
	{

		path=current_url.match(address);
		callback(req,res,path);

		
	}
}

function notfound()
{
	res.writeHead(404);
	res.end("not found");
}
function get(address,callback)
{
	if(req.method == "GET")
	{
		return routing(address,callback);
	}
	else {
		notfound();
	}
}
function put(address,callback)
{
	if(req.method == "PUT")
	{
		return routing(address,callback);
	}
	else {
		notfound();
	}
}
function del(address,callback)
{
	if(req.method == "DELETE")
	{
		return routing(address,callback);
	}
	else {
		notfound();
	}
}

function post(address,callback)
{
	if(req.method == "POST")
	{
		return routing(address,callback);
	}
	else {
		notfound();
	}
}

function init(_req,_res)
{
	req = _req;
	res = _res;
}

function staticFiles(extensions)
{
	//Regular expression is
	//[A-Za-z0-9@]+.(js|png|css)

	var exts = extensions.split("|");
	
	var reg = "[A-Za-z0-9@]+.(";
	for (var i = 0; i < exts.length; i++) {
		reg = reg + exts[i] + "|";
	};
	reg = reg.substring(0, reg.length - 1);
	reg = reg + ")";
	
	var staticRegular = new RegExp(reg);

	var url_parts = url.parse(req.url); 
	var current_url=url_parts.pathname;

	if(staticRegular.test(current_url))
	{
		var fileData = fs.readFileSync(__dirname+current_url);
		res.end(fileData);
	}
}

exports.init = init;
exports.get = get;
exports.post = post;
exports.put = put;
exports.notfound = notfound;
exports.del = del;
exports.staticFiles = staticFiles;
