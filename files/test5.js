

var centerofWolrd = new google.maps.LatLng(30, -210);

//each user has array of location(array of path, array of coords), array of text, array of time, one image
var map;

  	  
function initialize() {
        var mapOptions = {
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: centerofWolrd
        };
        
        map = new google.maps.Map(document.getElementById('map_canvas'),
                mapOptions);
		}
	



$(document).ready(function(){
var picurl='https://api.twitter.com/1/users/profile_image/';


var color=['purple','green','blue','yellow','black','red','darkgreen'];

// var userlist=[];
// var loclist=[];
// var markerlist=[];
// var pathCoordslist=[];
// var pathlist=[];
// var textlist=[];
// var timelist=[];
// var imagelist=[];
// var imagemakerlist=[];
// var windowlist=[];
// var testt=[];


$('#drop').click(function()// {
//function drop() 
{	
	// testt[4]=0;
	// testt[0]=[];
	// testt[0].push(5);
	// console.log(testt[0][0]);
	// if (typeof testt[5]=="undefined") {console.log('test.length: '+testt[4]);}
	
	var user = document.getElementById("inputform").username.value ;
	console.log("user name:",user);
	
	if(checkUserIndex(user) === -1)
	{
		//console.log("user checking");
		addUser(user);
		//console.log("user added");
		var userIndex = checkUserIndex(user);
		
		loclist[userIndex]=[];
		pathlist[userIndex]=[];
		pathCoordslist[userIndex]=[];
		markerlist[userIndex]=[];
		textlist[userIndex]=[];
		timelist[userIndex]=[];
		windowlist[userIndex]=[];
		var picurlTmp=picurl+user;
		imagelist[userIndex]=picurlTmp;
		imagemakerlist[userIndex]=[];


		addHtml(userIndex);
		
				// $('#form').append('<p class="users" id="'+userIndex+'"><a href="">  '+user+'<img class="userImg" id="'+user+'Img'+'"src='+imagelist[userIndex]+'/>'+'</a></p>');
				// var varToJP='#'+userIndex;
				// var varToJImg='#'+user+'Img';
				// if (userIndex!=0) {$(varToJP).css('margin-top','60px');}
				// $(varToJP).find('a').css('color',color[userIndex]);
				// $(varToJImg).css('border-style','solid');
				// $(varToJImg).css('border-color',color[userIndex]);
		
		
		//'color',color[userIndex]);

		var userurl='http://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&include_rts=false&trim_user=true&screen_name='+user+'&count=10';
		
		$.ajax
		({
			async: false,
			url: userurl,//'http://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=yvictorck&count=10',
			dataType:'jsonp',
			

			success:function(response)
			{

				
				$.each(response, function(index, value)
				{
					
					if (value.coordinates)
					{
						var place=value['coordinates'];
						timelist[userIndex].push(value['created_at']);
						textlist[userIndex].push(value['text']);
		// 				i++;
						var lat = place.coordinates[1];
						var lon = place.coordinates[0];
						console.log("lat and lon",lat,lon);
		 			// 	console.log('index: '+index+' lat: '+place.bounding_box.coordinates[0][0][1]);
						// console.log('index: '+index+' lon: '+place.bounding_box.coordinates[0][0][0]);
		// 				console.log(text);
						
						loclist[userIndex].push( new google.maps.LatLng(lat, lon));
					}
					if(index==response.length-1)
					{
						console.log('in drop show text:',textlist[userIndex],' lenght of text: ',textlist[userIndex].length);
						timelist[userIndex].reverse(); 
						textlist[userIndex].reverse(); 
						loclist[userIndex].reverse(); 
						console.log('loclist in drop: ', loclist);
						//loclist[userIndex]=loclist[userIndex].concat(ne);
		 				addMarkersSlowly(userIndex);
		 				//test(userIndex);
		 				//console.log(loclist);

					}
				})
					
			},
			error:function(){
			console.log("damn, I'm sad.");
			}
		});
	}
	
});

function test(userIndex)
{
	console.log('before for set time in test',loclist[userIndex].length);
	for (var i = 0; i < loclist[userIndex].length; i++) 
	{
		(function(i) {
    	console.log('test',i);
    	setTimeout(function() {  
		
		}, i * 200); 		
		
  		})(i);
		
	}
}


//return user index in userList, if no exist, return -1
function checkUserIndex(userName)
{
	for(var i=0;i<userlist.length;i++) 
	{
		if(userName==userlist[i])
		{
			return i;
		}
	};
	return -1;
}
//add new user into userlist
function addUser(userName)
{
	userlist.push(userName);
}


function notInUserlist(user)
{
	
}


var markers = [];
var iMarker=0;
function addHtml(userIndex)
{
	$('#form').append('<p class="users" id="'+userIndex+'"><a href="">  '+userlist[userIndex]+'<img class="userImg" id="'+userlist[userIndex]+'Img'+'"src='+imagelist[userIndex]+'/>'+'</a></p>');
	var varToJP='#'+userIndex;
	var varToJImg='#'+userlist[userIndex]+'Img';
	if (userIndex!=0) {$(varToJP).css('margin-top','60px');}
	$(varToJP).find('a').css('color',color[userIndex]);
	$(varToJImg).css('border-style','solid');
	$(varToJImg).css('border-color',color[userIndex]);  
}



function addMarkersSlowly(userIndex)
{
	//console.log('before for set time ',loclist[userIndex].length);


	for (var i = 0; i < loclist[userIndex].length; i++) 
	{
		// addMarkers(userIndex,i);
		// console.log(i);
		// setTimeout(function() {  
		// addMarkers(userIndex,i);
		// //addPath();
		// }, i * 200);


		(function(i) {
    	
    	setTimeout(function() {
				
			addMarkers(userIndex,i);
			addPath(userIndex,i);
			addWindow(userIndex,i);
			if (i==loclist[userIndex].length-1) 
			{
				adjustMap(-1);
				hoverWindow(userIndex);

			}
		}, i * 200); 		
		
  		})(i);
		
    }
    
}
function hoverWindow(userIndex)
{
	
	var varToJP='#'+userIndex;
	var deco='decoo'+userIndex;
	var vardeco='#'+deco;
	$(varToJP).hover(function() {
      			$(this).find('a').css('color','#49acec');
      			$(this).find('img').css('border-color','#49acec');
				// for( var i=0; i< windowlist[userIndex].length; i++)
				// {
					// windowlist[userIndex][i].open(map);
				// }
				adjustMap(userIndex);
      			},
   				function(){
   				$(this).find('a').css('color',color[userIndex]);
   				$(this).find('img').css('border-color',color[userIndex]);
				// for( var i=0; i< windowlist[userIndex].length; i++)
				// {
					// windowlist[userIndex][i].close(map);
				// }

      		});
			
	$(varToJP).toggle(
      function () {
	  $(this).append('<img id="'+deco+ '" src="tbird.png" width="50px" height="50px" />').fadeIn("slow");
      
        for( var i=0; i< windowlist[userIndex].length; i++)
				{
					windowlist[userIndex][i].open(map);
				}
				adjustMap(userIndex);
      },
      function () {
	   $(vardeco).remove();
        for( var i=0; i< windowlist[userIndex].length; i++)
				{
					windowlist[userIndex][i].close(map);
				}
      }
		);
}


function addWindow(userIndex,i)
{
	var contentString =  '<div >' +'<img src='+imagelist[userIndex]+'/>'+'<p>'+textlist[userIndex][i]+'</p><br>'+timelist[userIndex][i]+'</div>';
	var tmpinfowin = new google.maps.InfoWindow({
		content: contentString,
		position: loclist[userIndex][i],
		disableAutoPan: true
		});
	windowlist[userIndex].push(tmpinfowin);
}


function adjustMap(userIndex)
{
	var firstLoopLen;
	
	var locarray=[];
	var bounds = new google.maps.LatLngBounds();
	
	var latt=0;
	var longg=0;
	var counterr=0;
	if(userIndex==-1)
	{
		for(var i = 0; i<loclist.length; i++)
		{
			entry = loclist[i];
			for (var j = 0; j < entry.length; j++) 
			{
				locarray.push(entry[j]);
				// counterr=counterr+1;
				// latt=latt+entry[j]['Ya'];
				// longg=longg+entry[j]['Za'];
				// console.log('in adjust mapppp: ', entry[j]['Ya']);
				// console.log('in adjust mapppp: ', entry[j]['Za']);

			}
				
		}
	}
	else
	{
		entry = loclist[userIndex];
			for (var j = 0; j < entry.length; j++) 
			{
				locarray.push(entry[j]);
			}
	}
	for (var i = 0; i < locarray.length; i++) 
	{
	// //  And increase the bounds to take this point
		bounds.extend(locarray[i]);
	}
	// //  Fit these bounds to the map
	map.fitBounds(bounds);
	// map.set('center', new google.maps.LatLng(latt/counterr, longg/counterr));
	// map.set('zoom',2);
}
function addMarkers(userIndex,i)
{
	//console.log('in addMarkers, loclist length: ',loclist[userIndex].length);
	console.log('in addMarker: imaker value: ', i);
	imagemakerlist[userIndex].push(new google.maps.MarkerImage
		(imagelist[userIndex],
    new google.maps.Size(30, 30), //size
    new google.maps.Point(0, 0), //origin point
    new google.maps.Point(0, 0),
    new google.maps.Size(30, 30)
    )//offset point
		)

  console.log(textlist[userIndex][i]);
  console.log('hiii: ',markerlist);
try{
	markerlist[userIndex].push(new google.maps.Marker
	({
		position: loclist[userIndex][i],
		icon:imagemakerlist[userIndex][i],
		map: map,
		draggable: false,
		animation: google.maps.Animation.DROP,
	 
    }));
}catch(err){
 alert(err);
}
	console.log('in addMarker: imaker passes imager maekwe make');
	google.maps.event.addListener(markerlist[userIndex][i], 'mouseover', boxOverMarker);
	google.maps.event.addListener(markerlist[userIndex][i], 'mouseout', boxOutMarker);
	//google.maps.event.addListener(markerlist[userIndex][i], 'mouseover', make_callback_boxOver());//, iMaker));//function(){boxOverMarker(usertIndex,iMarker);
		//});
	//google.maps.event.addListener(markers[userIndex][i], 'mouseout', make_callback_boxOut(userIndex));//, iMaker));//function(){boxOutMarker(usertIndex,iMarker);
	//	});
	iMarker++;

}


function make_callback_boxOver(event) {

	console.log(event.latLng['Xa']);
	console.log(event.latLng['Ya']);

    // return function() {
    //      boxOverMarker();
    //      //console.log('make_call_back');
    // };
}
function make_callback_boxOut(userIndex) {
    return function() {
         boxOverOutMarker(userIndex);
    };
}



var infowindow;
function boxOverMarker(event)
{

	console.log(event.latLng);
	
	var match=[];
	var entry;

	for(var i = 0; i<windowlist.length; i++)
	{
		entry = windowlist[i];
		for (j = 0; j < entry.length; j++) 
			if(event.latLng==entry[j].getPosition())
			{
				infowindow=entry[j];
			}
	}
	infowindow.open(map);


	// for(var i = 0; i<loclist.length; i++)
	// {
		// entry = loclist[i];
		// for (j = 0; j < entry.length; j++) 
			// if(event.latLng==entry[j])
			// {
				// match.push(i);
				// match.push(j);
			// }
	// }

	// var contentString =  '<div >' +'<img src='+imagelist[match[0]]+'/>'+'<p>'+textlist[match[0]][match[1]]+'</p><br>'+timelist[match[0]][match[1]]+'</div>';
	// infowindow = new google.maps.InfoWindow({
		// content: contentString,
		// position: event.latLng,
		// //disableAutoPan: true
		// });


		// infowindow.open(map);
		
}

function  boxOutMarker(event)
{
	if(infowindow.getPosition()==this.position)
	{
		infowindow.close(map);
	}	
}

var lineSymbol = { 
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3
           };


var pathCoords=[];
var paths;
var iPath=0;

function addPath(userIndex,i) 
{
	pathCoordslist[userIndex].push(loclist[userIndex][i]);
	console.log('in addPath',pathCoordslist[userIndex]);
	pathlist[userIndex] = new google.maps.Polyline({
          path: pathCoordslist[userIndex],
          //strokeColor: "blue",
          strokeOpacity: 1,
 
          strokeWeight: 1,
          icons: [{
                icon: lineSymbol
                 }]

          
        });
	pathlist[userIndex].set('strokeColor',color[userIndex]);
	pathlist[userIndex].setMap(map);

	iMarker++;
	if(i==loclist[userIndex].length-1)
	{
		animateCircle(userIndex);
		iMarker==0;
	}

}
offsetId=[];
function animateCircle(userIndex) {
        
        var count = 0;
 		
        
        offsetId[userIndex] = window.setInterval(function() {
        count = (count + 1) % 200;
        var icons = pathlist[userIndex].get('icons');
        //console.log(icons[0]);
        icons[0].offset = (count / 2) + '%';
        pathlist[userIndex].set('icons', icons);
        // var icons2 = pathss2.get('icons');
        // icons2[0].offset = (count / 2) + '%';
        // paths2.set('icons', icons2);
        
        
        }, 20);
      

      }
function clearMap(){
	$('.users').remove();
	$('.userImg').remove();
	for(var i=0;i<userlist.length;i++)
	{
		window.clearInterval(offsetId[i]);
	}
	
	var mapOptions = {
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: centerofWolrd
        };
        
        map = new google.maps.Map(document.getElementById('map_canvas'),
                mapOptions);

	userlist=[];
	loclist=[];
	markerlist=[];
	pathCoordslist=[];
	pathlist=[];
	textlist=[];
	timelist=[];
	imagelist=[];
	imagemakerlist=[];
	windowlist=[];
	offsetId=[];

}

$('#refresh').click(function(){
	
	clearMap();

	// var entry;
	// var entry1;
	// var entry2;
	// for(var i = 0; i<windowlist.length; i++)
	// {
	// 	entry = windowlist[i];
	// 	entry2 = markerlist[i];
	// 	console.log(pathlist[i]);
	// 	pathlist[i].set('strokeOpacity',0);

	// 	for (j = 0; j < entry.length; j++) 
	// 		{
	// 			entry2[j].setVisible(false);
	// 			entry[j].close(map);
	// 		}
	// }


});
function postThat()
{
				var listOfFive=[]
				listOfFive.push(userlist);
				listOfFive.push(loclist);
				listOfFive.push(textlist);
				listOfFive.push(timelist);
				listOfFive.push(imagelist);
				console.log('in postt: ',loclist);
				var namerecord= document.getElementById("recordform").recordname.value ;

				mongoUtil.post(namerecord,listOfFive);	
}

			$('#postt').click(function() {
				postThat();
            });
           
            $('#gett').click(function() {
            	
            					var namerecord= document.getElementById("recordform").recordname.value ;
				            	mongoUtil.get(namerecord);

				     
            	
            });

function hey(){
	//var jsonObjj = $.parseJSON( hi );
	console.log(hi);//jsonObjj);
}
var hi;
var mongoUtil = {
_db: "victordb",
_appID:"heroku_app8150101",
_apiKey: "5099e500e4b0ec1736ec3df5",
	config: function(configuration) {
		
		for (var key in configuration) {
			this['_'+key] = configuration[key];
		};
	},
	url: function() {
		return 'https://www.mongolab.com/api/1/databases/'+this._appID+'/collections/'+this._db+'?apiKey='+this._apiKey;
	},
	post: function(id, data, callback) {
		var obj = {};
		obj[id] = data;
		var formattedData = JSON.stringify(obj);
		$.ajax({
			url:this.url(),
			dataType:'json',
			contentType:'application/json',
			type:'POST',
			data:formattedData,
			success:function(response){
				
				console.log("success",response);
				if(typeof(callback) === "function") {
					callback(response);
					console.log("The ajax request callback function has been fired.");
				}
			},
			error: function(error) {
				console.log("failure",error);
			}
		
		});				
	},


	get: function(id, callback) {
		
		$.ajax({

			url:this.url(),
			dataType:'json',
			contentType:'application/json',
			type:'GET',
			success:function(response){
				var check=0;
				$.each(response, function(index, value)
				{
					for(var propName in value) {
						if (propName==id) 
							{
								check=1;
								clearMap();
								restoree(value[propName]);
							};
						
					}

    				//if(value.hasOwnProperty(propName)) {
        			//var propValue = value[propName];
        			// do something with each element here
					//console.log('index: ',index,' valueeee: ',value['_id']);
				});
				if(check==0)
					{
						postThat();
						alert(id+' has been recorded');
					}
				//hi=(response);//[0].test1[0]);
				//hey();
				//console.log(loclist[0][0]);
				//console.log("success",response);
				//$("<h2>"+response.length+"</h2>").appendTo("h1");
			},
			error: function(error) {
				console.log("failure",error);
			}
	
		});
	}
};


function restoree(value)
{


		


	userlist=value[0];
	loclist=value[1];
	textlist=value[2];
	timelist=value[3];
	imagelist=value[4];
	console.log("locliat in restoree: ",loclist[0][1]['Ya']);
	for(var k=0;k<loclist.length;k++)
	{
		var entry=loclist[k];
		for(var i=0;i<entry.length;i++)
		{
			loclist[k][i]= new google.maps.LatLng(loclist[k][i]['Ya'], loclist[k][i]['Za']);
		}
	}


	for(var k=0;k<userlist.length;k++)
	{	

		imagemakerlist[k]=[];
		windowlist[k]=[];
		markerlist[k]=[];
		pathlist[k]=[];
		pathCoordslist[k]=[];
		

			
			addMarkersSlowly(k);
			addHtml(k);
			//hoverWindow(k);




		
		
	}
}


})
  
