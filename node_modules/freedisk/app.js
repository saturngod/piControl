var freedisk = require("./freedisk.js");

freedisk.drivelist(function(error,drives){

	if (error !== null) {
	      console.log(error);
    }
    else {

    	for (var i = 0; i < drives.length; i++) {
    		var mydrive = drives[i];
    		
    		freedisk.detail(mydrive,function(error,total,used,free){

    			if (error !== null) {
    				console.log(error);
    			}
    			else {
    				//total != used+free because it's using df -h
    				console.log("Drive : " + mydrive);
    				console.log("Total : " + total);
    				console.log("Used : " + used);
    				console.log("Free : " + free);
    			}

    		});//end of detail
    	}
    }
});