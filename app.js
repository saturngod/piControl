var http = require('http');
var url = require('url');
var exec = require('child_process').exec;
var fs = require("fs");
http.createServer(function (req, res) {
	
	var shutdown = "/shutdown";
	var restart = "/restart";
	var png = /\/([a-zA-Z0-9-_])+.png$/;
	
	var url_parts = url.parse(req.url); 
	var current_url=url_parts.pathname;
	
	
	if(current_url==shutdown)
	{
		res.writeHead(200);
		child = exec("shutdown -t 0", function (error, stdout, stderr) {
			res.end("Shutdown...");
		});
		
	}
	else if(current_url==restart)
	{
		res.writeHead(200);
		child = exec("reboot", function (error, stdout, stderr) {
			res.end("Reboot...");
		});
	}
	else if(current_url.match(png))
	{
		result=current_url.match(png);
		var fileData = fs.readFileSync("."+result[0]);
		res.end(fileData);
	}
	else
	{
		res.writeHead(200);
		var fileData = fs.readFileSync(__dirname + "/index.html");
		res.end(fileData);
	}
	res.end(); 

  
}).listen(1337);