$(document).ready(function() {
	$.ajax({
		type:"GET",
		url :"/freedisk",
		success:(function(data,status){
			
			for(i=0 ; i < data.length ; i++)
			{
				drive = data[i];

				el = $("#template").html();
				el = el.replace(/{{name}}/g,drive.name);
				el = el.replace(/{{total}}/g,drive.total);
				el = el.replace(/{{used}}/g,drive.total - drive.free);
				

				el = el.replace(/{{used_gb}}/g,(drive.total - drive.free)/1073741824);
				el = el.replace(/{{free_gb}}/g,drive.free/1073741824);
				el = el.replace(/{{total_gb}}/g,drive.total/1073741824);
				$("#drives").append(el);
			}
		})
	});
});

