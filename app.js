var http = require('http');
var freedisk = require('freedisk');
var exec = require('child_process').exec;
var fs = require("fs");

var piRoute = require(__dirname+"/piRoute.js");

http.createServer(function (req, res) {
	
	var shutdown = "/shutdown";
	var restart = "/restart";
	var getfreedisk = "/freedisk";

	var staticfile = "png|js|css";

	piRoute.init(req,res);
	piRoute.staticFiles(staticfile);
	
	piRoute.get(shutdown,function(req,res)
	{
		res.writeHead(200);
		child = exec("shutdown -h now", function (error, stdout, stderr) {
			res.end("Shutdown...");
		});
		res.write('Shutdown...');
	});
	
	piRoute.get(restart,function(req,res)
	{
		res.writeHead(200);
		child = exec("reboot", function (error, stdout, stderr) {
			res.end("Reboot...");
		});
		res.write('Reboot...');
	});
	
	piRoute.get(getfreedisk,function(req,res)
	{
		
		var disks = [];

		freedisk.drivelist(function(error,drives){

			if (error !== null) {
			      console.log(error);
			}
			else {
				var count = 0;
			    for (var i = 0; i < drives.length; i++) {
			        var mydrive = drives[i];

			        freedisk.detail(mydrive,function(error,total,used,free){

			            if (error !== null) {
			                console.log(error);
			            }
			            else {
			               var disk = {"name" : mydrive,"total":total,"free":free};
			               disks.push(disk);
			               count++;
			               if(count==drives.length)
			               {
			               		
			               		res.writeHead(200, { 'Content-Type': 'application/json' });
			               		res.end(JSON.stringify(disks));
			               }
			            }

			        });//end of detail
			    }
			}
			});
	});

	piRoute.get("/",function(req,res)
	{
		res.writeHead(200);
		var fileData = fs.readFileSync(__dirname + "/index.html");
		res.end(fileData);
	});


	//piRoute.notfound(); 

  
}).listen(1337);