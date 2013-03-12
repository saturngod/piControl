function drivelist(callback)
{
	var exec = require('child_process').exec,
    child;

	child = exec("df | awk '{print $1}'",
	  function (error, stdout, stderr) {

	    if (error !== null) {
	      callback(error);
	    }
	    else {
	    	//callback(null,stdout);
	    	var drives = new Array();

	    	//[ 'Filesystem', '/dev/disk0s2', 'devfs', 'map', 'map', '' ]
	    	var tmp_drives = stdout.split("\n"); 

	    	for (var i = 0; i < tmp_drives.length -1 ; i++) {
	    		name = tmp_drives[i];
	    		//only allow /
	    		if(name.substring(0,1)=="/")
	    		{
	    			drives.push(tmp_drives[i]);
	    		}
	    	};

	    	callback(null,drives);
	    }
	    
	});
}

function fulltrim(str)
{
	return str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
}

function convertToBytes(size)
{
	size = fulltrim(size);
	var last2 = size.slice(-2);
	var actual = parseInt(size.substr(0,size.length-2));

	if(last2=="Ti")
	{
		//Tera Bytes
		return actual*1024*1024*1024*1024;
	}
	if(last2=="Gi")
	{
		//Giga Bytes
		return actual*1024*1024*1024;
	}
	else if(last2=="Mi")
	{
		//Mega Bytes
		return actual*1024*1024;
	}
	else if(last2=="Ki")
	{
		//Kilo Bytes
		return actual*1024;
	}
	else if(last2=="Bi")
	{
		//Bytes
		return actual;
	}
}


function detail(drive,callback)
{
	var command = "df -h |grep "+drive+ " |awk '{print $2}'";//$2 for size
	var exec = require('child_process').exec,
    child;
	child = exec(command,
	  function (error, stdout, stderr) {

	  	if (error !== null) {
	      callback(error);
	    }
	    else {
	    	var totalSize = convertToBytes(stdout);
	    	var command = "df -h |grep "+drive+ " |awk '{print $3}'";//$3 for used space
	    	child = exec(command, 
	    		function (error, stdout, stderr) {
					if (error !== null) {
			  			callback(error);
					}
					else {
						var totalUsedSpace = convertToBytes(stdout);
						var command = "df -h |grep "+drive+ " |awk '{print $4}'";//$3 for used space
				    	child = exec(command, 
				    		function (error, stdout, stderr) {
								if (error !== null) {
						  			callback(error);
								}
								else {
									var totalFreeSpce = convertToBytes(stdout);



									callback(null,totalSize,totalUsedSpace,totalFreeSpce);
								}
						});//end of free space

					}
			});//end of used space


	    }

	  });//end of total size space



}

exports.drivelist = drivelist;
exports.detail = detail;